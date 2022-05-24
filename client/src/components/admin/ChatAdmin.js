import React from "react";

import default_profile from "../../assets/blank-profile.png"

export default function ContactAdmin ({dataContact, clickContact, contact}) {
  console.log(dataContact);
  console.log(clickContact);
  console.log(contact);
  // console.log(messages);
  // console.log(user);
  // console.log(sendMessage);
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
              <div 
                  className={`d-flex p-3 border-btm ${contact?.id === item?.id && "contact-active"}`}
                  key={item.id}
                  onClick={() => {clickContact(item)}}
              >
                  <img src={default_profile} alt="" width={45} className="rounded-circle shadow me-3 "/>
                  <p className='my-auto fw-600 '>{item.name}</p>
              </div>
          ))}
        </>
      )}
    </>
  )
}