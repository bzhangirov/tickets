<template>
  <div class="list-item">
    <div class="info-block">
      <div class="main-info">
        <img
          class="logo"
          :src="`https://aviata.kz/static/airline-logos/80x80/${item.validating_carrier}.png`"
          alt="airlines-logo"
        />
        <div
          class="company-name"
          v-text="computedItineraries.carrier_name"
        ></div>
        <div class="date-time">
          <div class="time">
            <div
              class="date"
              v-text="formatDate(computedItineraries.dep_date).date"
            ></div>
            <div
              class="time"
              v-text="formatDate(computedItineraries.dep_date).time"
            ></div>
          </div>
          <div class="duration">
            <div class="flight-info">
              <div class="city" v-text="firstOriginCode"></div>
              <div
                class="time"
                v-text="
                  millisecondsToHours(
                    computedItineraries.dep_date,
                    computedItineraries.arr_date
                  )
                "
              ></div>
              <div class="city" v-text="secondOriginCode"></div>
            </div>
            <img :src="require('../assets/line-circle.svg')" alt="line" />
            <div
              class="transfer"
              v-text="transferCount(computedItineraries.segments)"
            ></div>
          </div>
          <div class="time">
            <div
              class="date"
              v-text="formatDate(computedItineraries.arr_date).date"
            ></div>
            <div
              class="time"
              v-text="formatDate(computedItineraries.arr_date).time"
            ></div>
          </div>
        </div>
      </div>
      <div class="additional-info">
        <div class="underline-text">Детали перелета</div>
        <div class="underline-text">Условия тарифа</div>
        <div class="irrevocable">
          <img :src="require('../assets/icon-non-refundeble.svg')" alt="" />
          <div class="text" v-text="refundableText"></div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="price" v-text="priceText"></div>
      <button class="btn-green" v-text="'Выбрать'"></button>
      <div class="passenger-price">Цена за всех пассажиров</div>
      <div class="baggage">
        <div class="no-baggage" v-text="baggageText"></div>
        <div class="add-baggage">+ Добавить багаж</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketsListItem",
  props: {
    item: {
      type: [Array, Object],
      required: true,
    },
  },
  computed: {
    refundableText() {
      return this.item.refundable ? "невозвратный" : "возвратный";
    },
    computedItineraries() {
      return this.item.itineraries[0][0];
    },
    computedSegments() {
      return this.computedItineraries.segments;
    },
    firstOriginCode() {
      return this.computedSegments[0]?.origin_code
        ? this.computedSegments[0].origin_code
        : "Не найдено";
    },
    secondOriginCode() {
      return this.computedSegments[1]?.origin_code
        ? this.computedSegments[1].origin_code
        : "Не найдено";
    },
    priceText() {
      return `${this.item.price} ${this.item.currency}`;
    },
    baggageText() {
      if (
        this.computedSegments[0]?.services?.alt_text &&
        this.computedSegments[0]?.services?.alt_text !== "0 PC"
      ) {
        return this.computedSegments[0]?.services?.alt_text;
      }
      return "Нет багажа";
    },
  },
  methods: {
    // вынести в миксин
    formatDate(date) {
      const monthNames = [
          "янв",
          "фев",
          "мар",
          "апр",
          "май",
          "июль",
          "июнь",
          "авг",
          "сен",
          "окт",
          "ноя",
          "дек",
        ],
        dayNames = ["вс", "пн", "вт", "вр", "чт", "пт", "сб"],
        newDate = new Date(date),
        day = dayNames[newDate.getDay()],
        month = monthNames[newDate.getMonth()],
        utcDate = newDate.getUTCDate(),
        hours = `${newDate.getUTCHours()}`,
        hoursModify = hours.length === 1 ? `0${hours}` : hours,
        minutes = `${newDate.getUTCMinutes()}`,
        minutesModify = minutes.length === 1 ? `0${minutes}` : minutes;
      return {
        date: `${utcDate} ${month}, ${day}`,
        time: `${hoursModify}:${minutesModify}`,
      };
    },
    millisecondsToHours(depDate, arrDate) {
      const date1 = new Date(depDate),
        date2 = new Date(arrDate),
        date = date2 - date1,
        minutes = Math.floor((date / (1000 * 60)) % 60),
        hours = Math.floor((date / (1000 * 60 * 60)) % 24);
      return `${hours} ч ${minutes} м`;
    },
    transferCount(segments) {
      if (segments.length > 2) {
        const arrDate = new Date(segments[1].arr_time_iso),
          depDate = new Date(segments[1].dep_time_iso),
          difference = this.millisecondsToHours(depDate, arrDate);
        return `через ${segments[1].dest}, ${difference}`;
      }
      return "Прямой";
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  color: #202123;
  margin-bottom: 12px;
  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  & .info-block {
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    padding-top: 40px;
    padding-bottom: 18px;
    @media screen and (max-width: 850px) {
      padding-left: 0;
      align-items: center;
    }
    & .main-info {
      display: flex;
      align-items: center;
      margin-bottom: 46px;
      @media screen and (max-width: 540px) {
        flex-direction: column;
      }

      & .date-time {
        display: flex;
        @media screen and (max-width: 445px) {
          flex-direction: column;
        }
      }
      .logo {
        width: 25px;
        height: 25px;
        margin-right: 12px;
        @media screen and (max-width: 540px) {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
          margin-right: 0;
        }
      }
      & .company-name {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        max-width: 90px;
        width: 90px;
        text-align: left;
      }
      & .date {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
      }
      & .time {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
      }

      & .duration {
        margin: 0 27px;
        & .flight-info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          & .city {
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            color: #b9b9b9;
          }
          & .time {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
          }
        }
        & .transfer {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          color: #ff9900;
        }
      }
    }
    & .additional-info {
      display: flex;
      align-items: center;
      @media screen and (max-width: 445px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding-left: 20px;
      }
      & .underline-text {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #7284e4;
        border-bottom: 1px dashed #7284e4;
        cursor: pointer;
        &:first-child {
          margin-right: 23px;
          @media screen and (max-width: 445px) {
            margin-right: 0;
          }
        }
        @media screen and (max-width: 445px) {
          margin-bottom: 20px;
        }
      }
      & .irrevocable {
        margin-left: 50px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 445px) {
          margin-left: 0;
        }
        & .text {
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          color: #707276;
          margin-left: 7px;
        }
      }
    }
  }
  & .price-info {
    background: #f5f5f5;
    border-radius: 0 4px 4px 0;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & .price {
      font-size: 24px;
      line-height: 28px;
      font-weight: 600;
      margin-bottom: 13px;
    }
    & .btn-green {
      background: #55bb06;
      border-radius: 4px;
      border: none;
      width: 100%;
      height: 40px;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
      margin-bottom: 8px;
    }
    & .passenger-price {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #707276;
      margin-bottom: 16px;
    }
    & .baggage {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & .no-baggage {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        margin-right: 6px;
      }
      & .add-baggage {
        padding: 3px;
        background: #eaf0fa;
        border-radius: 2px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #5763b3;
      }
    }
  }
}
</style>
