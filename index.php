<?php
include("templates.php"); ?>

<?php getHeader() ?>

<div class="container">

    <div class="jumbotron">
        <h1>
            MetHotels Web Application
        </h1>
        <p>An application for booking hotels online</p>
    </div>

    <div class="panel">
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-8 col-sm-6 col-xs-12 pull-right">
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel1.jpg')"></div>

                        <p><em>Location:</em> New York City</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel2.jpg')"></div>

                        <p><em>Location:</em> Belgrade, Serbia</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel3.jpg')"></div>

                        <p><em>Location:</em> Barcelona, Spain</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel4.jpg')"></div>

                        <p><em>Location:</em> Bangkok, Thailand</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel5.jpg')"></div>

                        <p><em>Location:</em> Grand Rapids</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="hotel-images">
                        <div class="image" style="background-image: url('images/hotel6.jpg')"></div>

                        <p><em>Location:</em> Washington DC</p>

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Price</th>
                                <th>People</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Single</td>
                                <td>$300</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Double</td>
                                <td>$400</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Apartment Suite</td>
                                <td>$700</td>
                                <td>3+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6 col-xs-12 pull-left">
                    <form>
                        <div class="form-group">
                            <label for="first_name" class="control-label">First Name:</label>
                            <input type="text" class="form-control" placeholder="First Name" id="first_name">
                        </div>

                        <div class="form-group">
                            <label for="last_name" class="control-label">Last Name:</label>
                            <input type="text" class="form-control" placeholder="First Name" id="last_name">
                        </div>

                        <div class="form-group">
                            <label for="hotel_select" class="control-label">Hotel:</label>
                            <select name="hotel" id="hotel_select" class="form-control">
                                <option value="1">Hotel 1</option>
                                <option value="2">Hotel 2</option>
                                <option value="3">Hotel 3</option>
                                <option value="4">Hotel 4</option>
                                <option value="5">Hotel 5</option>
                                <option value="6">Hotel 6</option>
                            </select>
                        </div>

                        <div class="row" id="date">
                            <div class="col-sm-6 form-group">
                                <label for="from_date">From:</label>
                                <input id="from_date" type="text" class="form-control date-input">
                            </div>

                            <div class="col-sm-6 form-group">
                                <label for="to_date">To:</label>
                                <input id="to_date" type="text" class="form-control date-input">
                            </div>

                        </div>

                        <div class="form-group">
                            <label for="people" class="control-label">Number of People</label>
                            <input type="number" class="form-control" id="people" min="1">
                        </div>

                        <button type="submit" class="btn btn-primary">Book My Room</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php getFooter() ?>