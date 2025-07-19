

const loginLabel = document.getElementById("loginLabel");
const loginForm = document.getElementById("loginForm");




let flag = false;

loginLabel.addEventListener("click", function (e) {
  e.preventDefault();

  // تغییر margin-top با کلاس Tailwind (برای ترنزیشن درست)
  if (flag) {
    loginForm.classList.remove("-mt-64");  // یا هر کلاس منفی دیگه
    loginForm.classList.add("mt-0");

  } else {
    loginForm.classList.remove("mt-0");
    loginForm.classList.add("-mt-64");    // مقدار بالا بردن فرم


  }

  // تغییر سایز نوشته
  loginLabel.classList.replace(
    flag ? "text-5xl" : "text-3xl",
    flag ? "text-3xl" : "text-5xl"
  );

  flag = !flag;
});


/////signUp form/////
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = signupForm.querySelectorAll("input");
  const username = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all the fields");
    return;
  }

  try { // اول بررسی ایمیل موجود
    const resUsers = await fetch("https://6878eaa263f24f1fdca00119.mockapi.io/users");
    const users = await resUsers.json();

    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      alert("This email is already registered. Please use another email or log in.");
      return; // ثبت نام متوقف می‌شود
    }


    //////////
    const res = await fetch("https://6878eaa263f24f1fdca00119.mockapi.io/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    if (res.ok) {
      alert("Registration successful. Please log in now");
      signupForm.reset();
    } else {
      alert("Registration failed");
    }
  } catch (err) {
    alert("Error connecting to the server");
    console.error(err);
  }
});



////////loginformchecking//////////
// const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = loginForm.querySelectorAll("input");
  const email = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const res = await fetch("https://6878eaa263f24f1fdca00119.mockapi.io/users");
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    // if (user) {
    //   alert("ورود موفق!");
    //   // انتقال به داشبورد (مثلاً dashboard.html)
    //   window.location.href = "dashboard.html";
    // } else {
    //   alert("کاربری با این مشخصات پیدا نشد.");
    // }

    if (user) {
  alert("Login successful!");
  localStorage.setItem("loggedInUser", JSON.stringify(user)); 
  window.location.href = "dashboard.html";
} else {
  alert("user not found ");
}
  } catch (err) {
    alert("Error connecting to the server.");
    console.error(err);
  }
});


///////////////
// بعد از موفقیت در لاگین
localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
window.location.href = "dashboard.html";
