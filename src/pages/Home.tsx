export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TechStore</h1>
        <nav className="space-x-4">
          <a href="/login" className="text-gray-700 hover:text-blue-500">
            Login
          </a>
          <a href="/profile" className="text-gray-700 hover:text-blue-500">
            Profile
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-16 bg-blue-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Chào mừng đến với TechStore</h2>
        <p className="mb-6">Nơi bán đồ công nghệ xịn nhất cho sinh viên 😎</p>
        <a href="/login" className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold">
          Mua ngay
        </a>
      </section>

      {/* PRODUCT LIST */}
      <section className="p-8">
        <h3 className="text-2xl font-semibold mb-6">Sản phẩm nổi bật</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2023-03/cach-chup-man-hinh-may-tinh-win-10-1-01462986.png"
                alt=""
                className="mb-4 rounded"
              />
              <h4 className="font-semibold">Laptop {item}</h4>
              <p className="text-gray-500">Giá: 20.000.000đ</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
