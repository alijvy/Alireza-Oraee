import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: extract_foreground.swift <input> <output>\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])

guard let source = CGImageSourceCreateWithURL(inputURL as CFURL, nil),
      let inputCGImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    fputs("Could not decode input image.\n", stderr)
    exit(3)
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(cgImage: inputCGImage, options: [:])

do {
    try handler.perform([request])
    guard let observation = request.results?.first else {
        fputs("Vision did not find a foreground subject.\n", stderr)
        exit(4)
    }

    let maskBuffer = try observation.generateScaledMaskForImage(
        forInstances: observation.allInstances,
        from: handler
    )

    let foreground = CIImage(cgImage: inputCGImage)
    let mask = CIImage(cvPixelBuffer: maskBuffer)
    let transparent = CIImage(color: .clear).cropped(to: foreground.extent)
    let composited = foreground.applyingFilter(
        "CIBlendWithMask",
        parameters: [
            kCIInputBackgroundImageKey: transparent,
            kCIInputMaskImageKey: mask
        ]
    )

    let context = CIContext(options: [.useSoftwareRenderer: false])
    guard let outputCGImage = context.createCGImage(composited, from: foreground.extent),
          let destination = CGImageDestinationCreateWithURL(
              outputURL as CFURL,
              UTType.png.identifier as CFString,
              1,
              nil
          ) else {
        fputs("Could not create output image.\n", stderr)
        exit(5)
    }

    CGImageDestinationAddImage(destination, outputCGImage, nil)
    guard CGImageDestinationFinalize(destination) else {
        fputs("Could not finalize output PNG.\n", stderr)
        exit(6)
    }
} catch {
    fputs("Foreground extraction failed: \(error)\n", stderr)
    exit(7)
}
