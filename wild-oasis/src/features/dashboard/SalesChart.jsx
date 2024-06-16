/** @format */

import PropTypes from "prop-types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "./../../ui/Heading";
import { useDarkMode } from "../../hooks/useDarkMode";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, currentValue) => acc + currentValue.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, currentValue) => acc + currentValue.extrasPrice, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), "dd.MM.yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "dd.MM.yyyy")}
      </Heading>
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart data={data}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            color={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            type='monotone'
            strokeWidth={2}
            name='Total Sales'
            unit='$'
          />
          <Area
            dataKey='extrasSales'
            color={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            type='monotone'
            strokeWidth={2}
            name='Extras Sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.array,
  numDays: PropTypes.number,
};

export default SalesChart;
