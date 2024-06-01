import { ReactElement } from "react";
import useWeather from "../hooks/UseWeather";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import InputForm from "../components/layout/InputForm";
import DailyCard from "../components/common/cards/DailyCard";
import HourlyCard from "../components/common/cards/HourlyCard";
import WeatherCards from "../components/common/cards/WeatherCards";
import Loading from "../components/common/loader/LoaderComponent";
import Alert from "@mui/material/Alert";
import PageButton from "../components/common/buttons/PageButton";

const MainPage = (): ReactElement => {
  const onClick = () => {
    window.location.href = "/credits";
  };

  const {
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
      {loading ? (
        <Loading />
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
              {!error && (
                <>
                  <Menu
                    menuSelection={menuSelection}
                    setMenuSelection={setMenuSelection}
                  />
                  {menuSelection === "current" && weatherData && (
                    <WeatherCards
                      displayLocation={displayLocation}
                      weatherImg={weatherImg}
                      weatherData={weatherData.current}
                    />
                  )}
                  {menuSelection === "hourly" &&
                    weatherData &&
                    weatherData.hourly && (
                      <HourlyCard
                        data={weatherData.hourly}
                        timezone={weatherData.timezone}
                      />
                    )}
                  {menuSelection === "daily" &&
                    weatherData &&
                    weatherData.daily && <DailyCard data={weatherData.daily} />}
                </>
              )}
            </main>
          </div>
          <PageButton label={"Credits"} isSelected={false} onClick={onClick} />
          <Footer />
        </>
      )}
      {error && (
        <div className="w-full flex justify-center items-center">
          <Alert
            severity="error"
            sx={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}
          >
            {error}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MainPage;
