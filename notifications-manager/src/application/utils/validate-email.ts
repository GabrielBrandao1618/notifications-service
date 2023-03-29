let validateEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export function validateEmail(email: string): boolean {
  return Boolean(email.match(validateEmailRegex));
}
