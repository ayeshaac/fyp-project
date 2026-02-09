import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownVets = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSelect = (specialization) => {
    navigate(`/vets?specialization=${specialization}`);
    setOpen(false); // dropdown close after click
  };

  return (
    <>
      {/* Inline CSS */}
      <style>
        {`
          .dropdown-wrapper {
            position: relative;
            display: inline-block;
          }

          .dropdown-toggle {
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            font-weight: 500;
          }

          .dropdown-icon {
            transition: transform 0.2s ease;
          }

          .dropdown-icon.open {
            transform: rotate(180deg);
          }

          .vet-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 10px;
            list-style: none;
            padding: 10px 0;
            background-color: #ffffff;
            border-radius: 8px;
            min-width: 280px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
            z-index: 1000;
          }

          .vet-dropdown li {
            padding: 12px 18px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            transition: background-color 0.2s ease, padding-left 0.2s ease;
          }

          .vet-dropdown li:hover {
            background-color: #e6f7f9;
            color: #0b7285;
            padding-left: 24px;
          }

          .vet-dropdown li:not(:last-child) {
            border-bottom: 1px solid #f1f1f1;
          }
        `}
      </style>

      {/* Dropdown */}
      <div className="dropdown-wrapper">
        {/* 🔽 Toggle */}
        <div
          className="dropdown-toggle"
          onClick={() => setOpen(!open)}
        >
          <span>Find vet by issue</span>
          <span className={`dropdown-icon ${open ? "open" : ""}`}>▼</span>
        </div>

        {/* Menu */}
        {open && (
          <ul className="vet-dropdown">
            <li onClick={() => handleSelect("skin")}>
              Skin Allergy / Itching
            </li>
            <li onClick={() => handleSelect("infection")}>
              Fever / Infection
            </li>
            <li onClick={() => handleSelect("stomach")}>
              Stomach / Vomiting / Diarrhea
            </li>
            <li onClick={() => handleSelect("vaccination")}>
              Vaccination
            </li>
            <li onClick={() => handleSelect("parasites")}>
              Parasites (Ticks, Fleas, Worms)
            </li>
            <li onClick={() => handleSelect("dental")}>
              Dental / Teeth Problems
            </li>
            <li onClick={() => handleSelect("eye")}>
              Eye / Vision Problems
            </li>
            <li onClick={() => handleSelect("respiratory")}>
              Respiratory / Breathing Issues
            </li>
            <li onClick={() => handleSelect("urinary")}>
              Urinary Problems
            </li>
            <li onClick={() => handleSelect("pregnancy")}>
              Pregnancy / Breeding Care
            </li>
            <li onClick={() => handleSelect("surgery")}>
              Surgery / Injury
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default DropdownVets;
