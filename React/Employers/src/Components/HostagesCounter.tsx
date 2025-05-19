import { useEffect } from "react";

export default function HostagesCounter() {
  useEffect(() => {
    const div = document.createElement("div");
    div.id = "bthn";
    div.lang = "he";
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://bringthemhomenow.net/1.3.0/hostages-ticker.js";
    script.setAttribute(
      "integrity",
      "sha384-MmP7bD5QEJWvJccg9c0lDnn3LjjqQWDiRCxRV+NU8hij15icuwb29Jfw1TqJwuSv"
    );
    script.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(script);
  }, []);

  return null;
}
