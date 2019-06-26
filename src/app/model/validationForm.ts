import { FormControl, Validators, FormGroup } from '@angular/forms';

const formGroup = (formBuilder, ...controls): FormGroup => {
    const formGroup = {};
    controls.forEach(control => formGroup[control] = new FormControl(undefined, [Validators.required]));
    return formBuilder.group(formGroup);
}

const getValues = form => {
    const toReturn = {};
    const controls: any = Object.entries(form.controls);
    controls.forEach(([key, { value }]) => toReturn[key] = value);
    return toReturn;
}

const getErrors = (form, field) => form.controls[field].errors;

const hasError = (form, field) => getErrors(form, field);

export { formGroup, getValues, hasError };