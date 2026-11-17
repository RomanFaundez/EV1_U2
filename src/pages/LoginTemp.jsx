import { useState } from "react"
import { API_URL } from "../services/api"

export default function LoginTemp() {
  const [msg, setMsg] = useState("")

  const entrar = async () => {
  const r = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "docente@cft.cl", password: "123456" }),
  })
  const d = await r.json().catch(() => null)

  if (!r.ok) {
    setMsg("Error " + r.status + ": " + (d?.error || "no se pudo iniciar sesión"))
    return
  }

  localStorage.setItem("token", d.token)
  localStorage.setItem("user", JSON.stringify(d.user))
  setMsg("Status " + r.status + ": sesión guardada")
}

  return (
    <div className="flex flex-col items-start gap-4">
      <button onClick={entrar} className="rounded-lg bg-violet-600 px-4 py-2 text-white">
        Entrar de prueba
      </button>
      {msg && <p>{msg}</p>}
    </div>
  )
}