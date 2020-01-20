package timebased

import (
	"fmt"
	"time"

	"gocoop/pkg/coop/conditions"
)

//------------------------------------------------------------------------------
// Structure
//------------------------------------------------------------------------------

type timeBasedCondition struct {
	mode    string
	hours   int
	minutes int
}

//------------------------------------------------------------------------------
// Factory
//------------------------------------------------------------------------------

// NewTimeBasedCondition returns a new TimeBasedCondition.
func NewTimeBasedCondition(t string) (conditions.Condition, error) {
	h, m, err := parseTime(t)
	if err != nil {
		return nil, fmt.Errorf("Error while parsing the time for the opening condition : %s", err)
	}

	return &timeBasedCondition{
		hours:   h,
		minutes: m,
	}, nil
}

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------

// OpeningTime returns the time based on the conditions.
func (c *timeBasedCondition) OpeningTime() time.Time {
	return time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), c.hours, c.minutes, 0, 0, time.Local)
}

// ClosingTime returns the time based on the conditions.
func (c *timeBasedCondition) ClosingTime() time.Time {
	return c.OpeningTime()
}

// Mode returns the mode of the condition.
func (c *timeBasedCondition) Mode() string {
	return "time_based"
}

// Value returns the value of the condition.
func (c *timeBasedCondition) Value() string {
	return fmt.Sprintf("%02dh%02d", c.hours, c.minutes)
}
