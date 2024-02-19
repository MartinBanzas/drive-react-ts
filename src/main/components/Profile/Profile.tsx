import profilePic from "../../../assets/img/avatar2.jpg";

export const Profile = () => {
  return (
    <>
    <div className="d-inline-block container mt-5 ">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-dark  border-radius-lg pt-4 pb-3 d-flex align-items-center">
          <img
            src={profilePic}
            width={64}
            height={60}
            className="rounded-circle ms-2"
          />
          <div className="text-white ms-3">
            <h6 className="text-white">Jonathan Rodríguez</h6>
            <div className="text-gray-200">Programador jefe</div>
          </div>
        </div>
      </div>
    </div>

    <div className="card">
  <img src="..." className="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">An item</li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>
</>
    
  );
};