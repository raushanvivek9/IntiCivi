function Header() {
  return (
    <div className="bg-white border-bottom">
      <div className="container d-flex align-items-center py-3">

        {/* Left: Emblem + Title */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
          alt="logo"
          width="50"
          height="60"
          className="me-3"
        />
        <div>
          <h3 className="mb-0">National Civic Issue Portal</h3>
          <small>Government of India</small>
        </div>

        {/* Right: Two images */}
        <div className="ms-auto d-flex align-items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="Flag of India"
            width="70"
            height="60"
            style={{ objectFit: "contain", border: "0.5px solid #ddd" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Seal_of_Supreme_Court_of_India.png"
            alt="Supreme Court Seal"
            width="110"
            height="60"
            style={{ objectFit: "contain" }}
          />
        </div>

      </div>
    </div>
  )
}

export default Header