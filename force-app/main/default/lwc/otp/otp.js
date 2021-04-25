import { api, wire, LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import totp_generator from '@salesforce/resourceUrl/totp_generator';
import getCode from "@salesforce/apex/OtpController.getCode";

export default class Otp extends LightningElement {
    @api recordId

    @api title
    @api iconName
    @api totpFieldName

    secret
    code
    refreshCounter

    get ringCounter() {
        return (100 / 30) * this.refreshCounter
    }

    get ringVariant() {
        if (this.refreshCounter < 3) {
            return 'expired'
        }
        if (this.refreshCounter < 10) {
            return 'warning'
        }
        return 'base'
    }

    connectedCallback() {
        loadScript(this, totp_generator).then(() => {
            getCode({
                recordId: this.recordId,
                fieldName: this.totpFieldName
            }).then(res => {
                this.secret = res
                if (this.secret) {
                    this.code = new jsOTP.totp().getOtp(this.secret)
                    setInterval(function() {
                        this.code = new jsOTP.totp().getOtp(this.secret)
                        this.refreshCounter = 30 - Math.round((new Date().getTime() / 1000) % 30)
                    }.bind(this), 1000)
                }
            })
        });
    }
}