import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const BookTable = () => {
  const [tab, setTab] = useState('reservation');
  const [reservationForm, setReservationForm] = useState({ name: '', email: '', phone: '', numberOfPersons: 2, date: '', time: '' });
  const [reservationMsg, setReservationMsg] = useState('');

  // Calendar state
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', reason: '' });
  const [bookingMsg, setBookingMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/appointments');
      setAppointments(Array.isArray(data) ? data : []);
    } catch { setAppointments([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const generateWeekSlots = () => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1);
    start.setHours(0, 0, 0, 0);

    return Array(5).fill().map((_, dayOff) => {
      const day = new Date(start);
      day.setDate(start.getDate() + dayOff);
      const slots = Array(16).fill().map((_, i) => {
        const s = new Date(day);
        s.setHours(9 + Math.floor(i / 2), (i % 2) * 30, 0, 0);
        return s;
      }).filter(s => s.getHours() < 17);
      return { date: day, slots };
    });
  };

  const week = generateWeekSlots();

  const findAppointment = (slot) =>
    appointments.find(a => a.dateTime && new Date(a.dateTime).getTime() === slot.getTime()) ||
    appointments.find(a => a.date_time && new Date(a.date_time).getTime() === slot.getTime());

  const handleBookSlot = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;
    try {
      await api.post('/api/appointments', {
        name: bookingForm.name,
        email: bookingForm.email,
        reason: bookingForm.reason,
        dateTime: selectedSlot.toISOString(),
      });
      setBookingMsg('Appointment booked successfully!');
      setSelectedSlot(null);
      setBookingForm({ name: '', email: '', reason: '' });
      fetchAppointments();
      setTimeout(() => setBookingMsg(''), 3000);
    } catch (err) {
      setBookingMsg(err.message || 'Failed to book. Slot may be taken.');
    }
  };

  const handleCancelAppointment = async (appt) => {
    if (!confirm(`Cancel appointment for ${appt.name}?`)) return;
    try {
      await api.delete(`/api/appointments/${appt.id}`);
      fetchAppointments();
    } catch { alert('Failed to cancel'); }
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/reservations', reservationForm);
      setReservationMsg('Reservation confirmed! We look forward to seeing you.');
      setReservationForm({ name: '', email: '', phone: '', numberOfPersons: 2, date: '', time: '' });
      setTimeout(() => setReservationMsg(''), 5000);
    } catch { setReservationMsg('Failed to make reservation. Please try again.'); }
  };

  const isPast = (slot) => slot.getTime() < Date.now();

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <p className="section-sub">Reservation</p>
          <h1>Book Your <span className="gold">Table</span></h1>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <div className="booking-tabs">
            <button className={`booking-tab ${tab === 'reservation' ? 'booking-tab--active' : ''}`} onClick={() => setTab('reservation')}>
              Quick Reservation
            </button>
            <button className={`booking-tab ${tab === 'calendar' ? 'booking-tab--active' : ''}`} onClick={() => setTab('calendar')}>
              Appointment Calendar
            </button>
          </div>

          {tab === 'reservation' && (
            <div className="reservation-form-wrap">
              <div className="reservation-info">
                <h2>Reserve a <span className="gold">Table</span></h2>
                <p>Fill in the details below and we'll have your table ready and waiting. For parties larger than 8, please call us directly.</p>
                <div className="reservation-contact">
                  <div><span className="gold">Phone</span><p>+91 98765 43210</p></div>
                  <div><span className="gold">Email</span><p>reservations@pryfry.com</p></div>
                  <div><span className="gold">Hours</span><p>11 AM - 10 PM Daily</p></div>
                </div>
              </div>
              <form className="reservation-form" onSubmit={handleReservation}>
                {reservationMsg && <div className="form-msg">{reservationMsg}</div>}
                <div className="form-row">
                  <input type="text" placeholder="Your Name" required value={reservationForm.name} onChange={e => setReservationForm(p => ({...p, name: e.target.value}))} />
                  <input type="email" placeholder="Email Address" required value={reservationForm.email} onChange={e => setReservationForm(p => ({...p, email: e.target.value}))} />
                </div>
                <div className="form-row">
                  <input type="tel" placeholder="Phone Number" required value={reservationForm.phone} onChange={e => setReservationForm(p => ({...p, phone: e.target.value}))} />
                  <select value={reservationForm.numberOfPersons} onChange={e => setReservationForm(p => ({...p, numberOfPersons: +e.target.value}))}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <input type="date" required value={reservationForm.date} onChange={e => setReservationForm(p => ({...p, date: e.target.value}))} />
                  <input type="time" required value={reservationForm.time} onChange={e => setReservationForm(p => ({...p, time: e.target.value}))} />
                </div>
                <button type="submit" className="btn btn--gold btn--full">Reserve Table</button>
              </form>
            </div>
          )}

          {tab === 'calendar' && (
            <div className="calendar-wrap">
              {bookingMsg && <div className="form-msg">{bookingMsg}</div>}
              {loading ? (
                <div className="loading-spinner"><div className="spinner" /></div>
              ) : (
                <div className="calendar-grid">
                  {week.map(({ date, slots }) => (
                    <div className="cal-day" key={date.toISOString()}>
                      <div className="cal-day__header">
                        <span className="cal-day__name">{date.toLocaleDateString([], { weekday: 'short' })}</span>
                        <span className="cal-day__date">{date.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="cal-day__slots">
                        {slots.map(slot => {
                          const appt = findAppointment(slot);
                          const past = isPast(slot);
                          return (
                            <div
                              key={slot.toISOString()}
                              className={`cal-slot ${past ? 'cal-slot--past' : ''} ${appt ? 'cal-slot--booked' : ''} ${selectedSlot?.getTime() === slot.getTime() ? 'cal-slot--selected' : ''}`}
                              onClick={() => !past && !appt && setSelectedSlot(slot)}
                            >
                              <span className="cal-slot__time">
                                {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {appt && (
                                <div className="cal-slot__info">
                                  <span className="cal-slot__name">{appt.name}</span>
                                  <button className="cal-slot__cancel" onClick={(e) => { e.stopPropagation(); handleCancelAppointment(appt); }}>×</button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedSlot && (
                <div className="booking-modal-overlay" onClick={() => setSelectedSlot(null)}>
                  <div className="booking-modal" onClick={e => e.stopPropagation()}>
                    <button className="booking-modal__close" onClick={() => setSelectedSlot(null)}>×</button>
                    <h3>Book Appointment</h3>
                    <p className="gold">
                      {selectedSlot.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <form onSubmit={handleBookSlot}>
                      <input type="text" placeholder="Your Name" required value={bookingForm.name} onChange={e => setBookingForm(p => ({...p, name: e.target.value}))} />
                      <input type="email" placeholder="Email" required value={bookingForm.email} onChange={e => setBookingForm(p => ({...p, email: e.target.value}))} />
                      <textarea placeholder="Reason (optional)" rows="3" value={bookingForm.reason} onChange={e => setBookingForm(p => ({...p, reason: e.target.value}))} />
                      <button type="submit" className="btn btn--gold btn--full">Confirm Booking</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BookTable;
