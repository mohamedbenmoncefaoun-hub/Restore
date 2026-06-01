using System;
using API.Entities.OrderAggregate;

namespace API.DTOs;

public class CreateOrderDto
{
    public required ShippingAdress ShippingAddress { get; set; }
    public required PaymentSummary PaymentSummary { get; set; }

}
