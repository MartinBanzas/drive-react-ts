import '../../../assets/css/nucleo-icons.css'
import '../../../assets/css/nucleo-svg.css'
import '../../../assets/css/material-dashboard.css'
import React, { useCallback } from 'react'
import logo from '../../assets/img/logo-ct.png'

export const SignIn = () => {

    const [email, setEmail] = React.useState("");
    const [labelEmail, setLabelEmail] = React.useState("Email");
    const [password, setPassword] = React.useState("");
    const [labelPassword, setLabelPassword] = React.useState("Password");

    const handleLabelClick = (event: any) => {
        switch (event.target.id) {
            case "password": setLabelPassword(""); break;
            case "email": setLabelEmail(""); break;
        }
    }

    const sendLoginRequest = useCallback(async (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const formData = {
            username: email,
            password: password
        }

        try {
            const response = await fetch("http://localhost:8081/login", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log(response);


            } else {
                console.error("Fracaso en el logeo");
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
        }

    }, [])

    return (
        <div>
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
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
                                                Panel de control
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="../pages/profile.html">
                                                <i className="fa fa-user opacity-6 text-dark me-1"></i>
                                                Perfil
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="/signUp">
                                                <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                                                Registrarse
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="../pages/sign-in.html">
                                                <i className="fas fa-key opacity-6 text-dark me-1"></i>
                                                Entrar
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
                <div className="page-header align-items-start min-vh-100" >
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-12 mx-auto">
                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                            <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                            <div className="row mt-3">
                                                <div className="col-2 text-center ms-auto">
                                                    <a className="btn btn-link px-3" href="javascript:;">
                                                        <i className="fa fa-facebook text-white text-lg"></i>
                                                    </a>
                                                </div>
                                                <div className="col-2 text-center px-1">
                                                    <a className="btn btn-link px-3" href="javascript:;">
                                                        <i className="fa fa-github text-white text-lg"></i>
                                                    </a>
                                                </div>
                                                <div className="col-2 text-center me-auto">
                                                    <a className="btn btn-link px-3" href="javascript:;">
                                                        <i className="fa fa-google text-white text-lg"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form role="form" className="text-start">
                                            <div className="input-group input-group-outline my-3">
                                                <label htmlFor='email' className="form-label">{email ? "" : labelEmail}</label>
                                                <input type="email" onChange={(event) => setEmail(event.target.value)} onClick={handleLabelClick} id='email' className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <label className="form-label">{password ? "" : labelPassword}</label>
                                                <input type="password" onChange={(event) => setPassword(event?.target.value)} onClick={handleLabelClick} className="form-control" id='password' />
                                            </div>
                                            <div className="form-check form-switch d-flex align-items-center mb-3">
                                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                                <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Recuérdame</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" onClick={sendLoginRequest} className="btn bg-gradient-primary w-100 my-4 mb-2">Entrar</button>
                                            </div>
                                            <p className="mt-4 text-sm text-center">
                                                ¿No tienes cuenta? <a href="/signUp" className="text-primary text-gradient font-weight-bold">Regístrate</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}