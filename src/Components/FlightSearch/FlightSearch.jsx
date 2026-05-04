// FlightSearch.jsx
import { useState, useRef, useEffect } from "react";
import Message from "../Message/Message";
import "./FlightSearch.css";
import Hotel from "../Hotel/Hotel";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const WDS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function sameDay(a, b) {
  return a && b && a.getTime() === b.getTime();
}

function diffDays(a, b) {
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function fmtShort(d) {
  if (!d) return "Select";
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const ms = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getDay()]}. ${d.getDate()} ${ms[d.getMonth()]}. ${d.getFullYear()}`;
}

function fmtFooter(d) {
  if (!d) return "";
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const ms = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getDay()]}. ${d.getDate()} ${ms[d.getMonth()]}.`;
}

function CalendarMonth({ year, month, startDate, endDate, onPickDay, showPrev, showNext, onPrev, onNext }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const prevTotal = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = 0; i < first; i++) {
    days.push({ label: prevTotal - first + 1 + i, other: true });
  }

  for (let d = 1; d <= total; d++) {
    const dt = new Date(year, month, d);
    days.push({
      label: d,
      date: dt,
      isPast: dt < today,
      isToday: sameDay(dt, today),
      isStart: sameDay(dt, startDate),
      isEnd: sameDay(dt, endDate),
      inRange: startDate && endDate && dt > startDate && dt < endDate,
      isWeekend: dt.getDay() === 0 || dt.getDay() === 6,
    });
  }

  const rem = (first + total) % 7;
  if (rem) for (let i = 1; i <= 7 - rem; i++) days.push({ label: i, other: true });

  return (
    <div className="cal-month">
      <div className="cal-head">
        <button className={`cnav ${!showPrev ? "ghost" : ""}`} onClick={onPrev}>‹</button>
        <div className="cal-title">
          {MONTHS[month]} <span>{year}</span>
        </div>
        <button className={`cnav ${!showNext ? "ghost" : ""}`} onClick={onNext}>›</button>
      </div>

      <div className="wdays">
        {WDS.map((d, i) => <div key={i} className="wd">{d}</div>)}
      </div>

      <div className="dgrid">
        {days.map((day, i) => {
          if (day.other) return <div key={i} className="day other">{day.label}</div>;

          const cls = [
            "day",
            day.isPast && "past",
            day.isWeekend && "weekend",
            day.isStart && "start",
            day.isEnd && "end",
            day.inRange && "in-range",
            day.inRange && day.date.getDay() === 0 && "range-start-edge",
            day.inRange && day.date.getDay() === 6 && "range-end-edge",
            day.isToday && !day.isStart && !day.isEnd && "today-only",
          ].filter(Boolean).join(" ");

          return (
            <div key={i} className={cls} onClick={() => !day.isPast && onPickDay(day.date)}>
              {(day.isStart || day.isEnd)
                ? <div className="inner">{day.label}</div>
                : day.isToday
                  ? <><div className="inner-plain">{day.label}</div><span className="day-lbl-today">TODAY</span></>
                  : day.label
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FlightSearch({ onSearch, setValueNight, cityPrice }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [base, setBase] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
  const nights = startDate && endDate ? diffDays(startDate, endDate) : null;

useEffect(() => {
  if (!nights || !cityPrice) return;
  const extraWeeks = Math.max(0, Math.min(Math.ceil(nights / 7) - 1, 3));
  setValueNight(extraWeeks * (cityPrice * 0.10));
}, [nights, cityPrice, setValueNight]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  function pickDay(dt) {
    if (!selecting || !startDate || (startDate && endDate)) {
      setStartDate(dt);
      setEndDate(null);
      setSelecting(true);
    } else {
      if (dt <= startDate) {
        setStartDate(dt);
        setEndDate(null);
      } else {
        setEndDate(dt);
        setSelecting(false);
      }
    }
  }

  function handleApagar() {
    setStartDate(null);
    setEndDate(null);
    setSelecting(false);
  }

  function handleAplicar() {
    if (startDate && endDate) {
      onSearch?.({ startDate, endDate, nights });
      setOpen(false);
    }
  }

  function footerText() {
    if (startDate && endDate)
      return <>{fmtFooter(startDate)} – {fmtFooter(endDate)} — <strong>{nights} night{nights !== 1 ? "s" : ""}</strong></>;
    if (startDate)
      return "Select checkout date";
    return "Select check-in date";
  }

  return (
    <>
    <div className="shell" ref={wrapperRef}>

      {/* ── Trigger bar ── */}
      <div className="top-bar" onClick={() => setOpen((prev) => !prev)}>
        <div className="top-field">
          <div className="top-field-lbl">Check-in</div>
          <div className="top-field-val">{fmtShort(startDate)}</div>
        </div>
        <div className="top-nights">
          <div className="top-nights-lbl">Nights</div>
          <div className="top-nights-val">{nights ?? "—"}</div>
        </div>
        <div className="top-field">
          <div className="top-field-lbl">Check-out</div>
          <div className="top-field-val">{fmtShort(endDate)}</div>
        </div>
        <div className={`top-chevron ${open ? "flipped" : ""}`}>‹</div>
      </div>

      {/* ── Picker (opens/closes) ── */}
      
    <div className={`picker-wrapper${open ? " open" : ""}`}>
        <div className="picker-card">
          <div className="cal-area">
            <div className="cal-months">
              <CalendarMonth
                year={base.getFullYear()} month={base.getMonth()}
                startDate={startDate} endDate={endDate}
                onPickDay={pickDay}
                showPrev showNext={false}
                onPrev={() => setBase(new Date(base.getFullYear(), base.getMonth() - 1, 1))}
              />
              <CalendarMonth
                year={next.getFullYear()} month={next.getMonth()}
                startDate={startDate} endDate={endDate}
                onPickDay={pickDay}
                showPrev={false} showNext
                onNext={() => setBase(new Date(base.getFullYear(), base.getMonth() + 1, 1))}
              />
            </div>
          </div>

          <div className="picker-footer">
            <div className="footer-info">{footerText()}</div>
            <div className="footer-actions">
              <button className="btn-apagar" onClick={handleApagar}>Clear</button>
              <button className="btn-aplicar" onClick={handleAplicar}>Apply</button>
            </div>
          </div>
        </div>
    </div>
    </div>
    </>
  );
}