const fields = ["first_name", "last_name", "birthday_month", "birthday_day"];
export function validateEmployee(row) {
  const errors = [];
  fields.forEach((field) => { if (!row[field]) errors.push(`${field.replace("_", " ")} is required`); });
  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) errors.push("email is invalid");
  const month = Number(row.birthday_month); const day = Number(row.birthday_day);
  if (month < 1 || month > 12) errors.push("birthday month must be 1–12");
  if (day < 1 || day > 31) errors.push("birthday day must be 1–31");
  return errors;
}
