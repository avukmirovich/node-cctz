#ifndef UTIL_H
#define UTIL_H

#include <chrono>

using timepoint = std::chrono::time_point<std::chrono::system_clock, std::chrono::seconds>;

static timepoint toTimePoint(long long unixTimestamp) {
	return timepoint(std::chrono::seconds(unixTimestamp));
}

static double toUnixTimestamp(const timepoint& tp) {
	return tp.time_since_epoch().count();
}

#endif
