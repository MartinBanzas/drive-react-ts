

import img from '../../../assets/img/illustrations/illustration-signup.jpg'
export const Register = () => {
// // style="background-image: url('../assets/img/illustrations/illustration-signup.jpg'); background-size: cover;">

  return (
  <div>

<div className="container position-sticky z-index-sticky top-0">
    <div className="row">
      <div className="col-12">

    
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
                  <h4 className="font-weight-bolder">Iniciar sesión</h4>
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
                    ¿Ya tienes cuenta? <a href="/login" className="text-primary text-gradient font-weight-bold">Inicia sesión</a>
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