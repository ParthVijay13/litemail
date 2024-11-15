
const Signup = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-black text-white flex flex-col justify-center p-8 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Solving problems for every <span className="text-blue-500">team</span>
        </h1>
        <p className="text-base md:text-lg mb-12">
          Built on standard web technology, teams use LuminaTech to build beautiful cross-platform hybrid apps in a fraction of the time.
        </p>
        <div className="flex flex-col justify-center items-center">
          <button className="bg-gray-700 text-white py-3 px-6 mb-6 flex items-center justify-center w-full rounded-lg max-w-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg" alt="Google Logo" className="w-5 h-5 mr-3" />
            Sign up with Google
          </button>
          <button className="bg-gray-700 text-white py-3 px-6 mb-6 flex items-center justify-center w-full rounded-lg max-w-sm">
            <img src="https://s.yimg.com/cv/apiv2/default/icons/favicon_y19_32x32_custom.svg" alt="Yahoo Logo" className="w-5 h-5 mr-3" />
            Sign up with Yahoo
          </button>
          <div className="text-center text-gray-500 my-6">OR</div>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-800 text-white py-3 px-4 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
          />
          <input
            type="email"
            placeholder="Email address"
            className="bg-gray-800 text-white py-3 px-4 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="bg-gray-800 text-white py-3 px-4 w-full mb-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
          />
          <button className="bg-blue-500 text-white py-3 px-6 w-full rounded-lg max-w-sm">Next</button>
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img src="https://plus.unsplash.com/premium_photo-1680700221525-c41dc28197f2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D" alt="Laptop showing CRM software" className="max-w-full h-full" />
      </div>
    </div>
    </>
  )
}

export default Signup;