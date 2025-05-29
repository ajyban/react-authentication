import './Login.css';

export default function Login() {
  return (
    <div className="login-form d-flex align-items-center">      
      <div className="container text-center">
        <form>
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="row mb-3">
                <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="email" />
                </div>
              </div>
              <div class="row mb-3">
                <label htmlFor="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="password" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}