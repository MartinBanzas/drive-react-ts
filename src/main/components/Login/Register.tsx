

import img from '../../../assets/img/illustrations/illustration-signup.jpg'
export const Register = () => {
// // style="background-image: url('../assets/img/illustrations/illustration-signup.jpg'); background-size: cover;">

  return (
  <div>

<div className="container position-sticky z-index-sticky top-0">
    <div className="row">
      <div className="col-12">

        <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
          <div className="container-fluid ps-2 pe-0">
            <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="../pages/dashboard.html">
              Material Dashboard 2
            </a>
            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon mt-2">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navigation">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                    <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/profile.html">
                    <i className="fa fa-user opacity-6 text-dark me-1"></i>
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/sign-up.html">
                    <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/sign-in.html">
                    <i className="fas fa-key opacity-6 text-dark me-1"></i>
                    Sign In
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav d-lg-flex d-none">
                <li className="nav-item d-flex align-items-center">
                  <a className="btn btn-outline-primary btn-sm mb-0 me-2" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-material-dashboard">Online Builder</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/product/material-dashboard" className="btn btn-sm mb-0 me-1 bg-gradient-dark">Free download</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    
      </div>
    </div>
  </div>
  <main className="main-content  mt-0">
    <section>
      <div className="page-header min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
              
               <img src={img} className='position-relative h-100 m-3 px-1 border-radius-lg d-flex flex-column justify-content-center' style={{backgroundSize:'cover'}}/>
          
            </div>
            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
              <div className="card card-plain">
                <div className="card-header bg-gray-200">
                  <h4 className="font-weight-bolder">Sign Up</h4>
                  <p className="mb-0">Introduce tu email o contraseña para registrarte</p>
                </div>
                <div className="card-body">
                  <form role="form">
                    <div className="input-group input-group-outline mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control"/>
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <label className="form-label">Contraseña</label>
                      <input type="password" className="form-control"/>
                    </div>
                    <div className="form-check form-check-info text-start ps-0">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked/>
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Estoy de acuerdo con los <a href="javascript:;" className="text-dark font-weight-bolder">Términos y Condiciones</a>
                      </label>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Sign Up</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-2 text-sm mx-auto">
                    Already have an account? <a href="../pages/sign-in.html" className="text-primary text-gradient font-weight-bold">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  </div>)
}