import { AbstractControl } from '@angular/forms';

export function zipCodeValidator(control: AbstractControl) {
    if ( control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[0-9]{5}$');

        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }
    return null;
}

export function mdpValidator(control: AbstractControl) {
    if ( control && (control.value !== null || control.value !== undefined)) {
        const confMDPValue = control.value;
        //console.log("control.value " , confMDPValue);

        const mdpControl = control.root.get('mdp');
        //console.log("control.root.get('mdp')" , mdpControl);
        if ( mdpControl) {
            const mdpValue = mdpControl.value;
            if ( mdpValue !== confMDPValue) {
                return {
                    isError: true
                };
            }

        }
    }
    return null;
}
