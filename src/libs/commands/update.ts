import client from "../client";

export default async function update({
  table,
  attrs,
}: {
  table: string;
  attrs: { [key: string]: unknown };
}) {
  const command = `UPDATE ${table} SET ${Object.entries(attrs)
    .filter(([key, value]) => key.toLowerCase() !== "id")
    .map(
      ([key, value]) =>
        `${key} = ${typeof value === "string" ? `"${value}"` : value}`
    )
    .join(", ")} WHERE id = ${attrs?.id ?? attrs?.ID};`;

  return client.execute(command);
}

// SET price = ${price},\
