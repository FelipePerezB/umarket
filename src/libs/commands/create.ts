import client from "../client";
const format = (value: string | number | unknown) => `${typeof value === "string" ? `"${value}"` : value}`

export default async function create({
  table,
  attrs,
}: {
  table: string;
  attrs: { [key: string]: unknown };
}) {
  const command = `INSERT INTO ${table} (${Object.keys(attrs).map(format).join(
    ", "
  )}) VALUES (${Object.values(attrs).map(format).join(", ")})`;

  console.log(command)
  return client.execute(command);
}