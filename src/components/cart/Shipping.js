import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import {Country,State} from 'country-state-city'
import { useAlert } from 'react-alert'
import './Shipping.css'
import { BiHome } from 'react-icons/bi'
import { MdLocationCity, MdPinDrop, MdPublic, MdTransferWithinAStation } from 'react-icons/md'
import { BsPhone } from 'react-icons/bs'
import CheckoutSteps from './CheckoutSteps.js'
import { useNavigate } from 'react-router-dom'
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const {shippingInfo} = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [state, setState] = useState(shippingInfo.state)
    
    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
        alert.error("Phone Number should be 10 digits Long");
        return;
        }
        dispatch(
        saveShippingInfo({ address, city, state, country,pinCode: parseInt(pinCode),phoneNo: parseInt(phoneNo) })
        );
        navigate("/order/confirm");
    }
  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <BiHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <MdLocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MdPinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <BsPhone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <MdPublic />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <MdTransferWithinAStation />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Shipping