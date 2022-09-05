using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator:AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(q=>q.Title).NotEmpty();
            RuleFor(q=>q.Description).NotEmpty();
            RuleFor(q=>q.Date).NotEmpty();
            RuleFor(q=>q.Category).NotEmpty();
            RuleFor(q=>q.City).NotEmpty();
            RuleFor(q=>q.Venue).NotEmpty();
        }
    }
}