import React, {useState, useEffect } from "react";
import "./BookingList.css"; // Create a CSS file for styles
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/actions/bookingActions";

const BookingList = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const username = useSelector((state) => state.auth.user?.username);

  const [filters, setFilters] = useState({
    stripeid: '',
    title: '',
    duration: '',
    price: '',
    location: '',
    date: '',
    name: '',
    purchasedate: '',
    paidamount: '',
    Places: '',
    bookingstatus: '',
  });

  const region = username === "ukadmin" ? "United Kingdom" : "United States";

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

    // Filter bookings based on selected filter
    const filteredBookings = bookings.filter((booking) =>
      (filters.duration ? booking.CourseDuration === filters.duration : true) &&
      (filters.title ? booking.CourseTitle.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.location ? booking.CourseCity === filters.location : true) && 
      (filters.name ? booking.CustomerName === filters.name : true) &&
      (filters.purchasedate ? booking.PurchaseDate === filters.purchasedate : true) && 
      (filters.bookingstatus ? booking.BookingStatus === filters.bookingstatus : true) 
    );

    const londonCount = bookings.filter((b) => b.CourseCity === "London").length;
    const manchesterCount = bookings.filter((b) => b.CourseCity === "Manchester").length;
    const leedsCount = bookings.filter((b) => b.CourseCity === "Leeds").length;
    const beverlyhills = bookings.filter((b) => b.CourseCity === "Beverly Hills").length;
    const boston = bookings.filter((b) => b.CourseCity === "Boston").length;
    const scottsdale = bookings.filter((b) => b.CourseCity === "Scottsdale").length;
    const mcleanva = bookings.filter((b) => b.CourseCity === "McLean VA").length;
    const newyork = bookings.filter((b) => b.CourseCity === "New York").length;
    
  // Fetch bookings on component mount
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="booking-list">
      {/* Header Section */}
      <header>
        <h1>BOOKING LIST</h1>
        <p>{region}</p>
      </header>

      {/* Summary Tabs */}
     {/* Summary Tabs */}
      <div className="summary-tabs">
        <div className="tab">BOOKINGS SUMMARY</div>

        {region === "United Kingdom" ? (
          <>
            <div className="tab">
              LONDON <span>{londonCount}</span>
            </div>
            <div className="tab">
              LEEDS <span>{leedsCount}</span>
            </div>
            <div className="tab">
              MANCHESTER <span>{manchesterCount}</span>
            </div>
          </>
        ) : (
          <>
            <div className="tab">
              BEVERLY HILLS <span>{beverlyhills}</span>
            </div>
            <div className="tab">
              BOSTON <span>{boston}</span>
            </div>
            <div className="tab">
              SCOTTSDALE <span>{scottsdale}</span>
            </div>
            <div className="tab">
              MCLEAN VA <span>{mcleanva}</span>
            </div>
            <div className="tab">
              NEW YORK <span>{newyork}</span>
            </div>
          </>
        )}
      </div>


      {/* Filters Section */}
      <div className="filters">
        <span>View settings:</span>
        <button className="filter-btn active">All</button>
        <button className="filter-btn">This week</button>
        <button className="filter-btn">This month</button>
        <button className="filter-btn">This year</button>
      </div>

      {/* Export Section */}
      <div className="export-section">
        <button className="export-btn">Export All</button>
      </div>

      {/* Booking Table */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>Stripe ID</th>
            <th>Title
            <select name="title" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.CourseTitle))).map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
            </th>
            <th>Duration
            <select name="duration" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.CourseDuration))).map((duration, index) => (
              <option key={index} value={duration}>
                {duration}
              </option>
            ))}
          </select>

            </th>
            <th>Price</th>
            <th>Location
            <select name="location" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.CourseCity))).map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
            </th>
            <th>Date
            <select name="date" onChange={handleFilterChange}>
                <option value="">All</option>
                {bookings.map(booking => (
                  <option key={booking.date} value={booking.date}>{booking.date}</option>
                ))}
              </select>
            </th>
            <th>Name
            <select name="name" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.CustomerName))).map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
            </th>
            <th>Contact Details</th>
            <th>Purchase Date
            <select name="purchasedate" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.PurchaseDate))).map((purchasedate, index) => (
              <option key={index} value={purchasedate}>
                {purchasedate}
              </option>
            ))}
          </select>
            </th>
            <th>Paid Amount</th>
            <th>Places</th>
            <th>Booking Status
            <select name="bookingstatus" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(bookings.map(booking => booking.BookingStatus))).map((bookingstatus, index) => (
              <option key={index} value={bookingstatus}>
                {bookingstatus}
              </option>
            ))}
          </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.StripeOrderId}</td>
                <td>{booking.CourseTitle}</td>
                <td>{booking.CourseDuration}</td>
                <td>{booking.CoursePrice}</td>
                <td>{booking.CourseCity}</td>
                <td>{booking.date}</td>
                <td>{booking.CustomerName}</td>
                <td>
                <p>{booking.CustomerEmail}</p>
                <p>{booking.CustomerBillingAddress}</p>  
                <p>{booking.CustomerTelephone}</p>
                               
                </td>
                <td>{booking.PurchaseDate}</td>
                <td>Deposit: {booking.DepositeAmount}</td>
                <td>{booking.Places}</td>
                <td>
                  <select defaultValue={booking.BookingStatus}>
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 SASSOON ACADEMY</p>
      </footer>
    </div>
  );
};

export default BookingList;
