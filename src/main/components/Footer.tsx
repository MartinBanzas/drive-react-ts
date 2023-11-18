import botstrap from 'bootstrap';
import linkedin from '../../assets/icons/linkedin.png'
import twitter from '../../assets/icons/twitter.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'


export const Footer = () => {


  return (
    <footer className="footer py-4  fixed-bottom bg-gray-200  ">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-4 ">
            <div className="copyright text-center text-sm text-muted">
              © {new Date().getFullYear()}, hecho con <i className="fa fa-heart"></i> por {' '}
              <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">
                Martín Antelo Jallas
              </a>
             
            </div>
          </div>
          <div className="col-lg-6" >
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
              <a href="https://www.linkedin.com/in/martin-antelo-jallas" className="nav-link text-muted" target="_blank">
                 
                <img src={linkedin} width="32px" height="32px">
               
               
                </img> </a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/Atolmspek" className="nav-link text-muted" target="_blank">
                 <img src={github} width="32px" height="32px"></img>
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link text-muted" target="_blank">
                 <img src={twitter} width="32px" height="32px"></img>
                </a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">
                <img src={whatsapp} width="32px" height="32px"></img>

                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};