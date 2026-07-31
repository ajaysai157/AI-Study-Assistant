export function validateRegister({ name, email, password }) {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Name is required.");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (!email || !email.trim()) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  return errors;
}

export function validateLogin({ email, password }) {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push("Email is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  return errors;
}
