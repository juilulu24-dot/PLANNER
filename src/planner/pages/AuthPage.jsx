import React, { useState } from "react";
import { login, register } from "../utils/api";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let res;
    if (isLogin) {
      res = await login(email, password);
    } else {
      res = await register(name, email, password);
    }
    setLoading(false);
    if (res.token) {
      onAuth(res.token, res.user);
    } else {
      setError(res.error || "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nom"
            className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors mb-3"
          disabled={loading}
        >
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>
        <div className="text-center">
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Créer un compte" : "Déjà inscrit ? Connexion"}
          </button>
        </div>
      </form>
    </div>
  );
}
