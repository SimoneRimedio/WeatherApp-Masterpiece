import { ReactElement } from "react";
import useWeather from "./hooks/UseWeather";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Menu from "./components/layout/Menu";
import InputForm from "./components/layout/InputForm";
import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import WeatherCards from "./components/card/WeatherCards";
import Loading from "./common/Loader/LoaderComponent";
import Alert from "@mui/material/Alert";
import UserModal from "./common/Modal/Modal";

const App = (): ReactElement => {
  const {
    showModal,
    setShowModal,
    loading,
    weatherData,
    currentLocation,
    displayLocation,
    weatherImg,
    menuSelection,
    error,
    handleInput,
    handleLocation,
    setMenuSelection,
  } = useWeather();

  return (
    <div className="min-h-screen flex flex-col">
      {showModal ? (
        <UserModal show={showModal} onHide={() => setShowModal(false)} />
            ) : (
        <>
          <Header />
          <div className="flex container mx-auto px-4 sm:px-6 justify-center items-center">
            <main className="flex flex-col items-center w-full">
              <InputForm
                currentLocation={currentLocation}
                handleInput={handleInput}
                handleLocation={handleLocation}
              />
              {loading ? (
                <Loading />
              ) : (
                <>
                  {!error && (
                    <>
                      <div className="mt-8">
                        <Menu
                          menuSelection={menuSelection}
                          setMenuSelection={setMenuSelection}
                        />
                      </div>
                      {menuSelection === "current" && weatherData && (
                        <WeatherCards
                          displayLocation={displayLocation}
                          weatherImg={weatherImg}
                          weatherData={weatherData.current}
                        />
                      )}
                      {menuSelection === "hourly" && weatherData && weatherData.hourly && (
                        <HourlyCard
                          data={weatherData.hourly}
                          timezone={weatherData.timezone}
                        />
                      )}
                      {menuSelection === "daily" && weatherData && weatherData.daily && (
                        <DailyCard data={weatherData.daily} />
                      )}
                    </>
                  )}
                </>
              )}
            </main>
          </div>
          <Footer />
        </>
      )}
      {error && error !== "Permission to access location was denied." && (
        <Alert severity="error">{error}</Alert>
      )}
    </div>
  );
};

export default App;
