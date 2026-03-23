const USERS = [
  {
    email: "user@test.com",
    password: "1234",
    role: "user",
    name: "Normal User",
  },
  {
    email: "admin@test.com",
    password: "1234",
    role: "admin",
    name: "Admin",
  },
];

export function loginApi(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      } else {
        reject("Invalid credentials");
      }
    }, 500);
  });
}

export function logoutApi() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export function isLoggedIn() {
  return getCurrentUser() !== null;
}

export function getRole() {
  const user = getCurrentUser();
  return user ? user.role : null;
}