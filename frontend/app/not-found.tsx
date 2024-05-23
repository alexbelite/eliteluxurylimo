import Link from "next/link";
import "./error.scss";

const NotFound = () => {
  return (
    <div className="max-w-screen max-h-svh w-screen h-svh overflow-hidden relative">
      <div className="container-star w-screen h-svh">
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
      </div>
      <div className="container-bird">
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="container-title">
          <div className="title">
            <div className="number">4</div>
            <div className="moon">
              <div className="face">
                <div className="mouth"></div>
                <div className="eyes">
                  <div className="eye-left"></div>
                  <div className="eye-right"></div>
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>
          <div className="subtitle">
            Oops. Looks like you took a wrong turn.
          </div>
          <p className="tracking-wide mt-12 text-xl leading-10 font-semibold">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <Link
            href="/"
            className="text-white mt-10 text-2xl border-2 border-white p-2 rounded-md"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
