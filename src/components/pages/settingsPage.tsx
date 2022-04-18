import React, { FC } from 'react'

import BallImg from '../../images/svg/ball.svg'
import BellImg from '../../images/svg/bell.svg'
import ToyImg from '../../images/svg/toy.svg'
import SnowflakeImg from '../../images/svg/snowflake.svg'
import ConeImg from '../../images/svg/cone.svg'
import Nouislider from 'nouislider-react'
import 'nouislider/dist/nouislider.css'

export const urlLink =
  'https://raw.githubusercontent.com/ButerBrot359/CT-Data/master/assets/toys/'

export const SettingsPage: React.FC = (data) => {
  const shape: string[] = ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка']
  const colors: string[] = ['белый', 'желтый', 'красный', 'синий', 'зелёный']
  const size: string[] = ['большой', 'средний', 'малый']

  function changeRangeFilter(arr: string[], type: string): void {
    data.changeFilterForRange(arr, type)
  }

  return (
    <main className="main" id="settingsPage">
      <div className="main-container">
        <div className="settings-field">
          <div className="filter settings-block">
            <h2 className="controls-title">Фильтры по значению</h2>
            <div className="shapes">
              <span className="settings-text">Форма:</span>
              {shape.map((item) => {
                return (
                  <TypeButton
                    shape={item}
                    setFilter={data.onToggle}
                    defaultShapeFilter={data.defaultShapeFilter}
                    currentShapeState={data.currentState}
                    setCurrentShapeState={data.setCurrentState}
                  />
                )
              })}
            </div>
            <div className="color">
              <span className="settings-text">Цвет:</span>
              {colors.map((item) => {
                return (
                  <ColorButton
                    color={item}
                    setFilter={data.onToggle}
                    currentColorState={data.currentColorState}
                    setCurrentColorState={data.setCurrentColorState}
                  />
                )
              })}
            </div>
            <div className="size">
              <span className="settings-text">Размер:</span>
              {size.map((item) => {
                return (
                  <SizeButton
                    size={item}
                    setFilter={data.onToggle}
                    currentSizeState={data.currentSizeState}
                    setCurrentSizeState={data.setCurrentSizeState}
                  />
                )
              })}
            </div>
            <div className="favorite">
              <span className="settings-text">Только любимые:</span>
              <div className="form-group">
                <FavoriteCheckbox
                  setFilter={data.onToggle}
                  defaultFavFilter={data.defaultFavFilter}
                  setDefaultFavFilter={data.setDefaultFavFilter}
                />
              </div>
            </div>
          </div>
          <div className="range settings-block">
            <h2 className="controls-title">Фильтры по диапазону</h2>
            <div className="range-inputs">
              <div className="inputs_amount-block">
                <span className="settings-text">Количество экземпляров:</span>
                <div className="range-inputs_amount">
                  <div className="amount-output-min">{data.amount[0]}</div>
                  <div className="input-field">
                    <Nouislider
                      range={{ min: 1, max: 12 }}
                      start={[Number(data.amount[0]), Number(data.amount[1])]}
                      step={1}
                      onUpdate={(e: string[]) => {
                        changeRangeFilter(e, 'amount')
                      }}
                      connect
                      tooltips
                    />
                  </div>
                  <div className="amount-output-max">{data.amount[1]}</div>
                </div>
              </div>
              <div className="inputs_year-block">
                <span className="settings-text">Год приобретения:</span>
                <div className="range-inputs_year">
                  <div className="year-output-min">{data.year[0]}</div>
                  <div className="input-field">
                    <Nouislider
                      range={{ min: 1940, max: 2020 }}
                      start={[Number(data.year[0]), Number(data.year[1])]}
                      step={10}
                      onUpdate={(e: string[]) => {
                        changeRangeFilter(e, 'year')
                      }}
                      connect
                      tooltips
                    />
                  </div>
                  <div className="year-output-max">{data.year[1]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sort settings-block">
            <h2 className="controls-title">Сортировка: </h2>
            <div className="sort-inputs">
              <select
                className="sort-select"
                defaultValue={'sort-name-max'}
                onChange={(e) => {
                  data.sortData(e.target.value)
                }}
              >
                <option value="sort-name-max">По названию от «А» до «Я»</option>
                <option value="sort-name-min">По названию от «Я» до «А»</option>
                <option value="sort-count-max">
                  По количеству по возрастанию
                </option>
                <option value="sort-count-min">
                  По количеству по убыванию
                </option>
              </select>
              <ResetButton
                setDefaultFavFilter={data.setDefaultFavFilter}
                removeFilters={data.removeFilters}
                setCurrentState={data.setCurrentState}
                setCurrentColorState={data.setCurrentColorState}
                setCurrentSizeState={data.setCurrentSizeState}
              />
            </div>
          </div>
        </div>
        <div className="cards-field">
          {data.cards.map((el) => {
            return (
              <Card
                item={el}
                key={el.num}
                ToggleSelected={data.changeSelected}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

const ResetButton: React.FC = ({
  setDefaultFavFilter,
  removeFilters,
  setCurrentState,
  setCurrentColorState,
  setCurrentSizeState,
}) => {
  function removeFilterStyles(): void {
    setDefaultFavFilter(false)
    setCurrentState({
      ball: false,
      bell: false,
      cone: false,
      snowflake: false,
      toy: false,
    })
    setCurrentColorState({
      red: false,
      green: false,
      yellow: false,
      white: false,
      blue: false,
    })
    setCurrentSizeState({
      big: false,
      middle: false,
      small: false,
    })
  }
  return (
    <>
      <button
        className="reset"
        onClick={() => {
          removeFilterStyles()
          removeFilters()
        }}
      >
        Сброс фильтров
      </button>
    </>
  )
}
const FavoriteCheckbox: React.FC = ({
  setFilter,
  defaultFavFilter,
  setDefaultFavFilter,
}) => {
  return (
    <>
      <label
        htmlFor="checkbox"
        className={`favorite-input-label ${defaultFavFilter}`}
      ></label>
      <input
        type="checkbox"
        className={`favorite-input`}
        id="checkbox"
        onChange={() => {
          setFilter(null, 'favorite')
          setDefaultFavFilter(!defaultFavFilter)
        }}
      />
    </>
  )
}
const SizeButton: React.FC = ({
  size,
  setFilter,
  currentSizeState,
  setCurrentSizeState,
}) => {
  let eng: string = 'big'
  let classN: string
  switch (size) {
    case 'большой':
      eng = 'big'
      break
    case 'средний':
      eng = 'middle'
      break
    case 'малый':
      eng = 'small'
      break

    default:
      break
  }
  let newState = currentSizeState
  function change(prop: string) {
    newState[prop] = !newState[prop]
  }
  classN = currentSizeState[eng]
  return (
    <>
      <button
        className={`${size} size-button ${classN}`}
        onClick={() => {
          setFilter(size, 'size')
          change(eng)
          setCurrentSizeState(newState)
        }}
      >
        <img src={BallImg} alt="" />
      </button>
    </>
  )
}
const ColorButton: React.FC = ({
  color,
  setFilter,
  currentColorState,
  setCurrentColorState,
}) => {
  let colorEng: string = 'white'
  switch (color) {
    case 'белый':
      colorEng = 'white'
      break
    case 'красный':
      colorEng = 'red'
      break
    case 'желтый':
      colorEng = 'yellow'
      break
    case 'синий':
      colorEng = 'blue'
      break
    case 'зелёный':
      colorEng = 'green'
      break
    default:
      break
  }
  let classN = currentColorState[colorEng]
  let newState = currentColorState
  function change(prop: string) {
    newState[prop] = !newState[prop]
  }
  return (
    <>
      <button
        className={`${color} color-button ${classN}`}
        style={{ backgroundColor: colorEng }}
        onClick={() => {
          setFilter(color, 'color')
          change(colorEng)
          setCurrentColorState(newState)
        }}
      ></button>
    </>
  )
}
const TypeButton: React.FC = ({
  shape,
  setFilter,
  currentShapeState,
  setCurrentShapeState,
}) => {
  let classN: string = ''
  let prop: string = ''
  let src: string = ''
  switch (shape) {
    case 'шар':
      src = BallImg
      classN = currentShapeState.ball
      prop = 'ball'
      break
    case 'колокольчик':
      src = BellImg
      classN = currentShapeState.bell
      prop = 'bell'
      break
    case 'шишка':
      src = ConeImg
      classN = currentShapeState.cone
      prop = 'cone'
      break
    case 'снежинка':
      src = SnowflakeImg
      classN = currentShapeState.snowflake
      prop = 'snowflake'
      break
    case 'фигурка':
      src = ToyImg
      classN = currentShapeState.toy
      prop = 'toy'
      break
    default:
      break
  }
  let newState = currentShapeState
  function change(prop: string): void {
    newState[prop] = !newState[prop]
  }
  return (
    <>
      <button
        className={`${shape} shape-button ${classN}`}
        onClick={(): void => {
          setFilter(shape, 'shape'),
            change(prop),
            setCurrentShapeState(newState)
        }}
      >
        <img src={src} alt="" />
      </button>
    </>
  )
}
const Card: React.FC = (card) => {
  return (
    <>
      <div
        className={`card ${card.item.select ? 'selected' : ''}`}
        id={`card-${card.item.num}`}
        onClick={() => {
          card.ToggleSelected(card.item.num)
        }}
      >
        <h2 className="card-title">{card.item.name}</h2>
        <img
          className="card-img"
          src={`${urlLink}${card.item.num}.png`}
          alt=""
        />
        <div className="card-description">
          <p>Количество: {card.item.count}</p>
          <p>Год покупки: {card.item.year}</p>
          <p>Форма: {card.item.shape}</p>
          <p>Цвет: {card.item.color}</p>
          <p>Размер: {card.item.size}</p>
          <p>Любимая: {card.item.favorite ? 'Да' : 'Нет'}</p>
        </div>
        <div className="ribbon"></div>
      </div>
    </>
  )
}
