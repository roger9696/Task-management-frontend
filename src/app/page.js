export default function Home() {
  return (
    <main className="container-fluid ">
      <div className="row bg-light p-5 gx-5">
        <h4 className="text-center">
          Welcome home! To view the Task Register{" "}
        </h4>
        <p>
          <button className="btn btn-dark align-center mt-3">Try Now</button>
        </p>
      </div>
      <div>
        <h3 className="text-center">
          <p>
            Already have an account? Login!
            <a className="text-24px" href="login">
              Login
            </a>{" "}
          </p>
        </h3>
      </div>
      <div>
        <h3 className="text-center">
          Don't have an account? SignUp!
          <a className="text-24px" href="register">
            Here
          </a>
        </h3>
      </div>
    </main>
  );
}
