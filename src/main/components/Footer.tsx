import botstrap from 'bootstrap';

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
                <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">
                  Creative Tim
                </a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};