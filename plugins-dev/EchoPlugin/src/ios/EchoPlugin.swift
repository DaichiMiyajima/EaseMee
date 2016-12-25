import Foundation

@objc(EchoPlugin) class EchoPlugin : CDVPlugin {
    
    func echo(_ command: CDVInvokedUrlCommand) {
        var pluginResult = CDVPluginResult(
            status: CDVCommandStatus_ERROR
        )
        
        var message = command.arguments[0] as! String
        message = "yasaasda"
        
        
        let toastController: UIAlertController =
            UIAlertController(
                title: "",
                message: message,
                preferredStyle: .alert
        )
        
        self.viewController?.present(
            toastController,
            animated: true,
            completion: nil
        )
        
        let duration = Double(NSEC_PER_SEC) * 3.0
        
        DispatchQueue.main.asyncAfter(
            deadline: DispatchTime.now() + Double(Int64(duration)) / Double(NSEC_PER_SEC),
            execute: {
                toastController.dismiss(
                    animated: true,
                    completion: nil
                )
        }
        )
        
        pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message)
        
        self.commandDelegate!.send(
            pluginResult,
            callbackId: command.callbackId
        )
        
    }
    
}
