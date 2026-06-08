import type { User } from "../../interfaces";

export const users: User[] = [
  {
    id: "user-001",
    name: "Alex Johnson",
    email: "alex@ascendra.dev",
    role: "engineer",
    vmCount: 5,
  },
  {
    id: "user-002",
    name: "Maria Rodriguez",
    email: "maria@ascendra.dev",
    role: "engineer",
    vmCount: 0,
  },
  {
    id: "user-003",
    name: "Taylor Smith",
    email: "taylor@ascendra.dev",
    role: "engineer",
    vmCount: 2,
  },
  {
    id: "user-004",
    name: "Stefan Karadjordjevic",
    email: "stefan@ascendra.dev",
    role: "admin",
    vmCount: 0,
  },
];

const promiseTemplate = (failureChance: number = 0.1) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < failureChance) {
        reject(new Error("Failed to log in"));
      } else {
        resolve(null);
      }
    }, 800),
  );

export async function login(email: string) {
  await promiseTemplate(0.05); // 5% chance of failure

  const user = users.find(
    (candidate) => candidate.email.toLowerCase() === email.toLowerCase(),
  );

  if (!user) {
    return new Response(
      JSON.stringify({ message: "No account found for that email" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getAllUsers() {
  await promiseTemplate(0.1); // 10% chance of failure

  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}
