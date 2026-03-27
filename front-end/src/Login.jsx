function Login() {
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <div>
        <label className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter password"
        />
      </div>
      <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold mt-6">
        Continued
      </button>
    </div>
  </div>;
}
