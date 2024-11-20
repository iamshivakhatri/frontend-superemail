import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800">
      <header className="p-5 flex justify-between items-center shadow-md bg-white">
        <h1 className="text-4xl font-bold text-purple-700">My Awesome App</h1>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li className="hover:text-purple-500 cursor-pointer">Home</li>
            <li className="hover:text-purple-500 cursor-pointer">About</li>
            <li className="hover:text-purple-500 cursor-pointer">Contact</li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-5 py-20">
        <h2 className="text-5xl font-extrabold mb-5">Welcome to Our Landing Page</h2>
        <p className="text-lg max-w-xl mb-8">
          Discover amazing features, engage with our tools, and grow your experience with us.
        </p>
        <button className="bg-purple-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-purple-700">
          Get Started
        </button>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">Feature 1</h3>
          <p>Explore this amazing functionality and benefit from it.</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">Feature 2</h3>
          <p>Learn how we make your life simpler with our solutions.</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-3">Feature 3</h3>
          <p>Join a community of satisfied users leveraging this feature.</p>
        </div>
      </section>

      <footer className="bg-purple-600 text-white py-5 text-center">
        <p>&copy; 2024 My Awesome App. All rights reserved.</p>
      </footer>
    </div>
  );
}
