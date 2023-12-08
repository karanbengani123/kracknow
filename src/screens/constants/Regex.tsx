export const RegexExpresion = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  email2: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  name: /^\S*$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/,
  newPassword:  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  phone: /^[1-9][0-9]{9}$/,
  phone10: /@"^[0-9]{10}$"/, 
  gst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
  pan: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])$/,
  pincode: /^[1-9][0-9]{5}$/,
  ifscCode: /^[A-Za-z]{4}\d{7}$/,
  percentage: /(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/,
  positiveNumber: /^\d+$/
};

export const IsValidRegex = (formValue: string, regex: RegExp) => {
  return regex.test(formValue);
};
