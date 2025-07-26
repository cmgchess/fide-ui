import DoughnutChart from '../components/DoughnutChart';
import HalfDoughnutChart from '../components/HalfDoughnutChart';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { useState } from 'react';
import Select, { components } from 'react-select';
import {
  getAllStats,
  getOpponentStats,
  getPlayers,
  getPlayerDetails,
} from '../api';
import { typeMap, getAllWLDfromStats, getWLDForTypefromStats } from '../utils';
const { Option } = components;

const ALL_OPTION = { value: 'all', label: 'All', country: null };

const HomeScreen = () => {
  const [id, setId] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(ALL_OPTION);
  const [allStats, setAllStats] = useState({});
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedOpponentStats, setSelectedOpponentStats] = useState({});
  const [opponentsLoading, setOpponentsLoading] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const FlagOption = (props) => (
    <Option {...props}>
      <div className="flex items-center">
        {props.data.country && (
          <img
            src={`https://ratings.fide.com/svg/${props.data.country}.svg`}
            className="w-6 mr-2"
            alt={props.data.label}
          />
        )}

        <span>{props.data.label}</span>
      </div>
    </Option>
  );

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value !== ALL_OPTION.value) {
      getOpponentStats(id, selectedOption.value).then((data) => {
        setSelectedOpponentStats(data);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedOption(ALL_OPTION);
    if (id.length > 0) {
      setOpponentsLoading(true);
      setPlayerLoading(true);
      getPlayers(id).then((data) => {
        const playerOptions = [
          ALL_OPTION,
          ...data.map((player) => ({
            value: player.id_number,
            label: `${player.name} (${player.country})`,
            country: player.country,
          })),
        ];
        setOptions(playerOptions);
        setOpponentsLoading(false);
      });
      getAllStats(id).then((data) => {
        setAllStats(data);
      });
      getPlayerDetails(id).then((data) => {
        setPlayerDetails(data);
        setPlayerLoading(false);
      });
    }
  };

  const renderDoughnutChart = (color) => {
    const allSelected = selectedOption.value === ALL_OPTION.value;
    const title = `Total games with ${color}`;
    const dataPoints = allSelected
      ? getAllWLDfromStats(allStats, color)
      : getAllWLDfromStats(selectedOpponentStats, color);
    return <DoughnutChart title={title} dataPoints={dataPoints} />;
  };

  const centeredSpinner = (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );

  const renderHalfDoughnutChart = (color, typeKey) => {
    const allSelected = selectedOption.value === ALL_OPTION.value;
    const title = `${typeKey} games with ${color}`;
    const dataPoints = allSelected
      ? getWLDForTypefromStats(allStats, color, typeMap[typeKey])
      : getWLDForTypefromStats(selectedOpponentStats, color, typeMap[typeKey]);
    return <HalfDoughnutChart title={title} dataPoints={dataPoints} />;
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <div className="w-full max-w-md mt-8 mb-8">
          <div className="flex flex-row">
            <input
              className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              value={id}
              onChange={handleChange}
              placeholder="Enter FIDE ID"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
          {(opponentsLoading || playerLoading) && centeredSpinner}
          {options.length > 1 && !opponentsLoading && !playerLoading && (
            <>
              <div className="flex flex-col items-center mt-4">
                <div className="text-2xl">{playerDetails.name}</div>
              </div>
              <div className="mt-4">
                <Select
                  options={options}
                  defaultValue={options[0]}
                  value={selectedOption}
                  onChange={handleSelectChange}
                  components={{ Option: FlagOption }}
                />
              </div>
              <div className="flex flex-wrap justify-center mt-4 sm:flex-nowrap">
                <div className="mx-4">{renderDoughnutChart('white')}</div>
                <div className="mx-4">{renderDoughnutChart('black')}</div>
              </div>
              <div className="flex flex-wrap justify-center mt-4 sm:flex-nowrap">
                <div className="mx-4">
                  {renderHalfDoughnutChart('white', 'STANDARD')}
                </div>
                <div className="mx-4">
                  {renderHalfDoughnutChart('black', 'STANDARD')}
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4 sm:flex-nowrap">
                <div className="mx-4">
                  {renderHalfDoughnutChart('white', 'RAPID')}
                </div>
                <div className="mx-4">
                  {renderHalfDoughnutChart('black', 'RAPID')}
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4 sm:flex-nowrap">
                <div className="mx-4">
                  {renderHalfDoughnutChart('white', 'BLITZ')}
                </div>
                <div className="mx-4">
                  {renderHalfDoughnutChart('black', 'BLITZ')}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomeScreen;
