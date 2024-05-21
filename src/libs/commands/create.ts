import client from "../client";
const format = (value: string | number | unknown) => `${typeof value === "string" ? `"${value}"` : value}`

export default async function create({
  table,
  attrs,
}: {
  table: string;
  attrs: { [key: string]: unknown };
}) {
  const filteredAttrs = Object.fromEntries(Object.entries(attrs).filter(([key, value])=>value))
  const command = `INSERT INTO ${table} (${Object.keys(filteredAttrs).map(format).join(
    ", "
  )}) VALUES (${Object.values(filteredAttrs).map(format).join(", ")})`;

  console.log(command)
  return client.execute(command);
}