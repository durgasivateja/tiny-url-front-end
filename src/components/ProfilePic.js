import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Topbar from "./Topbar";
import ProfilePicture from "profile-picture";
import "profile-picture/build/ProfilePicture.css";
import { withStyles } from "@material-ui/styles";
import { config } from "../config";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class SignUp extends Component {
  constructor() {
    super();
    this.profilePictureRef = React.createRef();
    this.state = {
      loggedIn: false,
      token: undefined,
      username: "",
      email: "",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAZuUlEQVR4Xu2dCfRV0xfHz0v6Ef1Q5qgIJUNCScM/lAZTRS0kYyxiFauQsEQswzJLkWRMpiSVEGqhJPyslKRBVCgSTZTQ+6/PyXnd3+u9d+85995373vvnLVa1e937xn2/t599t5nn70TQoikSGvVqlUTrVu3Fm+++abg35laIpHI+HMvP5w9e7bo1q2bWLJkifjnn39EMpmUf2wLnwLZ+MbPt99+e1G/fn0xfvx4ccABB4gqVar4nhB8pe9///1X/PrrrxJXixYtSvULilKc58GqVauKTp06iTFjxsh/8zPViZ/ZbN68WfbTq1cvMWrUKNkv4LMtXhTYbrvtRFlZmbjzzjvFVVddJfi/an6Ejupjw4YNEuQ///zzFlwpANI5iD/zzDPF6NGjJUD4fxCDMvh3330njjvuOLFmzRrx999/V6K6lX7xAiF832GHHaSA+PHHH0WtWrUCw4ESOvvss49YtWoV/SZSErB79+7ihRdeCAz1AIsBhw0bJvr37y+QgqpZ0MULdNnULID43HPPia5du1bChensFd8RbIcccshWAJ5xxhli7NixlbZcP9KPPX/t2rWiZ8+e4u23395Gx7MANGVh/t6D/woD559/vhg6dKioXr16YNKQ7ThRtWrVJIrhO++8IxGuBvQDPsCFodGmTRvBIM4t1wIvfwAKaiQFxIYNG4rJkyeL2rVrB9I1QirRtGnT5PTp06UFRHOKSJNReB+Rfc0114g///wzZeXardeEmvF6BwFVXl4ureRWrVr5xgqrS6xbty658847b6ObmUhAwNevXz8xZMiQFJiV3qf6sxIwXqAymQ28hMe9e/eWIHRayrr9JTZv3pw0AZtzIECGsdG5c2cxZcoUsWnTJt152OcLiALKZ3jhhRdKvRAAmvoME8kARNJvv/0mGjduLB2Nf/31l3UqFxCY/EwVf+H//vc/MW7cOGmcmDTfAOQ0o3nz5hJ8SEKnq8VkQvadwqIAkq9Zs2bi/ffflyDUtSF8AXDx4sWiRYsWAgkI8LBqbCs9CnBiduCBB4rPPvtM1KhRQxLAq1qnDUCF8G+//VY0bdpUnmyo47oAdvPS416RrBgvCqcbs2bNErvssovEhBcQGgEQ0O2xxx5S6jlBZwFYJGgyXAY64W677SbmzZuXAqFbV9oAXL58uXREOqVeOtItEN3IXry/Rw9EEs6YMUMKKbfmGYCAasWKFfL8buPGjSl9L5PSaQHoRvbi/T3CCLfMoYceKqZNmyZ22mmnnH5CzwBE8h177LGCv2kWZMULIr8rU37CJk2aiI8++ih1ypapX08A5EgNP9/333+/jeTzO1n7fvFSAOv4qKOOEp9++mlKZUu3kF0BSCABJxxTp06VW69tlgJeKYAkxDAhlIsgZHyG6cHNOQHI8dqAAQPkuV96EKnXSdjnSpsCykC97777RN++fStFXElpmO0oDqcyqL3kkkvs6UZpY8jX6p3+QEL+2rZtW8k/mBGAiMk5c+aIY445xt7b8EV++7LTRYeD+osvvhD16tWThJHgzCQBidWvW7eujOez1q4FkR8KOAGIDtigQQNRUVEh75xsswWrYALE5Mcff2ylnx/K23czUoBrvj169BAjR47ccunNKQExOq6//nrxyCOPSHeLOu2wtLQUCIICTmk4adIk0bFjx8oAZH/m6iTgs1tvECS3faRTQJ2UgLGffvppKwDXr18v92dOOiz4LHDCooCyijmu23vvvbcAEN3vsssuk5eJbLaCsEhv+00/BcFJLQGIy4VzOxtQakESNgWceqCUhps2bUoSw+WMcAl7Erb/0qVAeuheok+fPkluNtm7HKULiihXnqhSpYrUAW2zFIiCAjI5kbV6oyC9HVMaJVYCWiBESQErAaOkvh17a4JKSwtLgSgoUClFbxQTsGOWNgUsAEub/5Gv3gIwchaU9gQsAEub/5Gv3gIwchaU9gQsAEub/5Gv3gIwchaU9gQKBoAqgPHoo4/2lParUNjKMShBwJ9//rnrlLlDQf69P/74I2fc5mmnnZZKmcs7pNIjoRTpk4n3JL/PnnvuKT788EPXMcN+oKAASGoQlZkrbMLkq39uHpJzZ/78+a4RSST6mTt3rrw28csvv2SMXOdDvemmmwQfKtmpqNFC7j5+RgAogF+wYIEEMeNGnc+7IADIV8xlKeqXyQNsH4US8wUsL+MAhjvuuEPcdttt2+RaTH+fPCsPP/ywzEz/wQcfiPbt229TAsNJGzJaEPJOuYwbb7xR5mihPtvdd98ta30wNkHIUWe8iD0AAR9/KHjjLKTjhcFxfgYAkF+b1La0XBFJfHA77rijrK2mqpdyhYKyaiSFdzb1cQJA8vRdffXVEoBI2kGDBonhw4fLClbnnnuuTDxgJWAOlKg0XzNnzhRHHHGEr3oUcQIjYOP6w7777itWr16dUZKp+apLPMuWLZMSTUk5JBdFBLlMlg2AqCt9+vQRAwcOlI9Qjo2sBB06dJBpV+wW7IIKvvbzzjtPPPHEE5JJ6jZ9nMCkOxfARwAwtZiRQkj2XBIQyYc0Q3qp5wAl9FDpU5zvKwlIqVXo9eijj4qzzz5bAv6rr74SF110kaztMXjwYEH9t6gvocV6C6aCE2VeySmiahfrMjxuzwNADADWpLbdbNsvKgeGxMKFCwW04DmV3gygAWSKxbz00kuuQMqWNDzqaPjYAhDiP/jgg3ILSc8pFzdQeZ2PWsfpp58ui0OqavHZ3mcHwIqlGIzTwFD/pj90O/RI6rS46ZGZxok6Gj6WAORrRUEmP40qouiVyXF+Dma/9957AgCmGw/p82bdXbp0kYaGs3C42mLV30gw/HukuSjEa7WxAyCE5ctHX6G0ezG5XNh6GzVqJH744QfX7BNsvdAgU6b5dJoAvIsvvlg8//zz8oON2rWiIwRiB0DAd91110n/WDE1QHHttddKo8BN94MGjz/+uDQY0lumD5L+sKYPOugg8fvvv7uCO050jR0AsfpwLWTKJxwnwunOhdMHShco4yH9facuhpRE+qXrfW46HPpit27dpGUdtW7nlT6xAiDMIUMXGfm9EN/rIqN+DmODAs/UUssGDKd1y5Hjfvvt55kG6l3+RhekcGCh6IOxASBultatW8vEhcXWAMQVV1yR86wX8LD13nDDDdLnl81tkos29EHhSMDLCUfULhYvfIwVAAvlq/VC2Ey6m9OPl/57VI5dd91VrFy5spKvz2Ssd999V3Tq1CkFwDhvx7EBoAmhC+mdXNlmAR9+Twq6EDTgtwE4anNw2hL1SYfbWiwA3SiUh98DQMphjBgxIpDRsLjJdsZpC8COMwgtAANhuXkn+O34g2+QNHlBNaTg6NGj5VFdelndoMYIoh8LwCCo6KMPJNRTTz0lLrjgAh+9ZH4VQ4QIGIyguEpBC8DA2e6tQ3RCtl6qzlNRMoxYR6QgicAJPMVRHccTEgtAb3gJ9CnlYiHEHodznTp1Au0/vTNOVfr37x9LB7UFYKisz945Eg9/H8Gi+EDDair+8LDDDpOXk+JWgsMCMCzO5+gX8AEEdLR8RftwRrz77rvHzjltARgBANmCORsmeCBfDUlIGY5LL700VgaJBWC+EPDfbT4MD262UQ4tn6FmuGIYj7s1ixYtco1HzBdZLADzRGll9dasWVPeAQ7S5+d1CYCQS/D7779/bKJl8gZAvnyuCVavXt0rvWL5HFsZetu8efO050eo2csvvyzIXGAi/Rh76dKl8lLRPffcY9QHk8bviBTGLRP1OXHoAFQuhyOPPFJeqMb1UOjt/vvvlzfVdBp0aNeunXjrrbeMr5fiTMaxPHXqVOk75FqlSaOfNm3aiE8++SRyoyQvAMTNQIwb92ALuWG5rlu3Tnv7ZP1sfziFycmiK/1UvN+YMWPEOeeckzpaU1a0kmJe+lXPwg+MoKhDtkIHIIC7/fbbxc0331zI2JNzZ8visjcuDa/+NECB24WUGDiDTRoSi+AC9Ed1pEafZD249957U13qAJCX2MbJmkCLaisODYAq/AiGYXWhN6EHFmpjPUOGDBH9+vWTzNKJXeRy1TfffGPkcGYsQNezZ0/x6quvViIfIJw9e7Zo2LCh/LkXADo7oF/Cv9BnVaxivvkTGgBVjNuXX34p70I4vzJdQuWbKJnGw3rkroZKjeZVYgASaMBJhEkD6LNmzZJnxukxhfSNYcOdYD5wE7py8Z8PBH7pfFQma8n0TigAhBDoPVhaDz30UKVxTYgU1GJN+0FScNmHMvNul8mdYwAOHL/4/Ewb94fJCUNCofStko8AECIducrAv3WakuRk3WIrZm351glDASCEYHHoSuXl5ZX0i0IEILfNTjnlFC1dSX2ESEw/x23keCE3TnpMn9PwAOhYtIcffrjRVkxfSEESIOU7bCsUAHK5ZsKECTKHXfpXW2gABEBkJdXZotRWSRweaTWUZNJZO0DAYQ2o1BXVdOmmrGMAjh5ISL+prr148WKZOTXfwauBAxDwkXoCl0Em60qHCTrbSRjPAoLLL79cnqF6lQysDxBAg1deeaWSXqazdizuFi1aSP1PRbRkW6NyjuObvOWWW1LGjs549IG6xFaMxZ2vFigAWTD3ELD49tprr4ymvQ5R8kWEbON8/fXX0kpEOfeqG7E+3CVYp5z8qKa7bjIo4LbR0TkBESl8ldGnOybAI3iVQAmv6/XLo0ABiPTjmAjFO5P042e6RPG7QNP3YTwuJHVN0ms/SD98c2T1UmvVXfOKFSvk3V5d1whbPbocINQ1SBS/sNg5YVEA9Grte6VP+nOBARAik7ETdwUWcLaJ6zIj18J0TgC8Ekj1eeuttwqO3Eh/psMEpA9MNM1nyFgnn3yymDZtmutZbToteRchQF4d/JUmfle2frZhtmNAGLYkDAyAMBh/FCD00pQC7eXZfD+jcjd7lUAKCDyv4vxMPzTOedu2bbuNz89JA6Sbm7HAGoh60W1qzahQa9asCf0eSWAAJIMnFqNXaUHGe9JQmDJKSQoCHPw0xcj0eSM9vH79rAFXSK9evWRSTdPtD+lDsIabQxi9FIs3U1NJ3enDdB6sh9MRSj2oPIZe+arLi8AA6HVgFodyjs+Jf5sAEGDg4iARD/92JnD0Og/1nPri0wmcfurg1i/GFzuAn9ttPXr0kOFa2fRnfk7/JDkKIoOC25q4r8IHRdBDUQEQHcmP05T0bfisqHuhtnITIKeD0I0hmX6vxp0+fbo4/vjjTbqQ7+BIJjlTLunHWEhZSi3Qsn0kfmjhXADAQ6dlO3eTyqYLz5sEhChIKqzDBx54IDVfXWIh8cg09fTTT0sXha6kMiVUtvcwNjglGTt2rJyLruLPB4T7gw+Sc9lshpUy8tAxSWKUjwatKyoq5IdV8ACEMSjF+Mc4ntNtijHkD6RUlbrj4NVQ0B3P7Xmn+oAk5saZSYOxOJDZ6pw6Z/qHydb7zDPPyLIV+TTgmFPfvn3FsGHDQtmG8yYBkRRkhj/ppJNM+CQXj0ukQYMG0tWj9KSwdBO3Saq7vCQUypRK1+199XskGtIvPWuB04fIGjkOxCqNokF35shW7NUw8zrPvAAQ6Uc4+sSJE40P5lk4ljNHTU7dzetCg34OiYQkpuKkibXJfFAhTjjhBFkNIJMR5JwzzmmiqaNozA0dFf+krl/Ubb55ASAVewgBNwlHVwsgnF2lrVVbUFTSD+mERMIaPfjgg7UseaeOR1Z7sttn8uk5t2CSmxNRratfujFf5/fMm8pO48aNC/RKZ+gAZKsiVs1P9icYxBaAb0oZHVEaH3xQGEKclOi6kpTOiiRRUTaZ9FjVr7NSkq7BpgMwL88yZ2IT8UIwlyC241AByLEQZ5Mc6mez7rwsnIN5FGEFuiglIFIIAKKPKaevlzWkP9OsWTN5ZgtTMzUFtjfeeENG1vihn8n8Mr3DHCisTZSO1+ggt7FDA6AiIAaDMzJG9yumMDNbr3PBUQFQzZ0QKTIM6K5FMQNjrHPnzjm3MoIauDpJMKxz6zUd0w0IOr/H6HrxxRcDKfUaCgAhEor5XXfdJQ/FdbcpJzH42lCAnS0qALImTiuIDzRpat64bIgWz7WFATosZFVP2GS8XJLVT384qNkFgtDBQwEgjCIoAbPdtMQqi6MKJPcdgtA1/BBcvcs5LdYo594mjXXgx8Np7ZaVgGpRGB5hN6e7x+tY8IYzeDwbbkERbn2GAkC+XlwLuCn8HIqr+7dx2HbUmbOJw1lJPiR5y5YtKznRszEIyW/q3nFjOr+HL7i1VCVOfqZLZ44Fn332WV+nJKEAkHLyzvNKLwQp9mcwNggg4LjNy6V2dbFLFxQ6dCTglnN5jvZ0T1d4nqI4VLXCRWa6HQcKQIiFmY7Va7IoHeIV0rMwB32YjKhewKfWFgb4nEDBRYY7iQv3ula2en78+PGyJgnNBISBApDMV6+99poMk7JtKwUowVCvXj3Xy0X5ppmSsuSpNsmuoABHFM/MmTONXDOBAFBZuQQbcL2PFqXXPt+MzDUeAZ24bNh6g/KdBb0+eIVlS9PVO9GNWSP5DlUfOpIwEACq6GE85EQG+3G7BE3cqPvDkUxWhbiCT9GHrZiIFxNjhLVRCf6ss87K6ljPxodAAMiJx2OPPSbLTakwqTD0l6jBpDM+UoBUbljNcazPkb4W+KU8F7q8UxIPC1/5bL1KQV8AVBPl7gA6QNw89jqACfpZGEAySRJS+vWVBT23TP2x9XJVgjvdahfTMYZYL24zzq5pXn23vgGIJaVShOma8vkgbBRjQAeAx3Fb3LdeJ30QIJy5mwRZqH6IluG0CL3QCwh9AZBBub3PRWxdsR0FMPIxJuDD54dViX/MCxPyMS8vY8BDzqDZzfDvmfCU9SL5J0+enPr4cm3HxgBE8tWtW1eWmiorKzOarBeiFNoz6HtkLkUnLtTGdswVW/iq0wAafk5uB4INt+NGafDgP9QZRFlJAHDKlCmiVatWRg5I3TEL5XnUEVJb6Dic47Y2JB9n0aTw9WpMKFzwN+9waQzL2s0AMwIgugL7PBG9tm2lAMTGIFu4cGGod2nDprmKZmJ34w6OSQOEhPBzfztXMwIgEzzxxBPlLX6dL8RkIYX0Do5YdgV1hbGQacMOhwtJ3UA04QNb8YwZM8IBoMmESu2dQgZgvnhlJAHzNTk7TvFTwAKw+Hkc6xVaAMaaPcU/OQvA4udxrFdoARhr9hT/5CwAi5/HsV6hBWCs2VP8k7MALH4ex3qFFoCxZk/xT84CsPh5HOsVWgDGmj3FPzkLwOLncaxXaAEYa/YU/+QsAIufx7FeoQVgrNlT/JOzACx+Hsd6hYlEIpG0gZOx5lFRTy5RpUqVZCFdHSxqbpTg4hJlZWVJVRGxBNdvlxwxBRK9evVKUgKqENJHREwrO3wIFEhs2LAhSS4QLiOHVZAuhHnbLouEAtICofZD8+bNY5dAsUhobJeRhQKyzrMyga+88krx5JNPut5kt9S0FAiKAlQbSAGQhDpcNLdbcVDktf3kogDJDerUqbMVgPgCqcVLcWJSilnfoAVQWBRQGXSXLl26FYAMBugGDhwo88MVUl67sAhl+w2HAhQvotQX+RMrHYMAQIBHjTJyxPF/KwnDYUKp9kr+we7du4tRo0ZtySWe6Rxu1apVskYZOY4tAEsVKsGvm4RHlN0lYZHKKZn1IJg8d6Qasw7q4BlRij0i+cDS/PnzUwUYs0pARSDy/1Ga027FpQiZYNcMAClTS2066f9LEIglMm/Bamjy3ZEpc8SIEWLDhg3Bzsj2VjIUAGwURhwwYMAW0P0HPlcA8gCBCmS6pP6DW7rVkqGoXagWBU499VQxYcKE1DtaAOQtytNTYp4yXNY9o0X7kn+YLXfq1Klbt1yH9PMkAVXtDwo1k3ybv/mZjSEseWzlJAAWb9OmTSX4cmXbdw2HVgAEcNS9wIxGItpmKZCLAtRJQW1Tx7vZao64ApBBlBVMuNbKlSsFVTGtBLQAzEQBLFySm8+bN0/UrFlTPpKrgpYnADoHAnic4TVp0kSsXbvWAtHisBIFKFg+Z86cFPhS7pY03U+9pA1Ahea5c+eKtm3bygJ1qk6s5UXpUoCg5lq1askjXEBYydLNAj5PRkgmkiojhMqKHTp0EMuXL7eSsHSxJ1dev359qfNRuNrpaHYji7YETN+Oly1bJl00bMcbN250G8/+vsgoQPwoxWwmTZqUMjikZMsh9Zwk8AVApWAStFC7dm3pqLY37IoMYS7Lad++vRgzZoyoUaOG0cIlAIOo80sf+H0WLFggo2hsK24KoPO1a9dOjB07VkbRe5V46VRJrFmzJqnQa9qJAjCnJP369RNDhw61AQxFij/0O/4MHjxYBi+rcD1T7CRatmyZpMAenms69tvwFQ4fPlwePBPAYE9N/FI0Pu8j6eAnxagJWgYzfgD4n+BKJFu2bCmPTOjQT8NHqEBcUVEhOnbsKFavXl3QtXP90KOY3iWcqlGjRuL111+XxaiDEFbSWMFRDfBANMgOqmM6x0fYpUsXMW3aNMkLe3pSWJBkW0VKcYeja9euMiyPo7WgGrZCpfRsSKyJEydKhTIoIAK6kSNHir59+8pIGhtNExT7wu8HwYRKNW7cOEFIlY5/z8vscFxXAiB7PANhViNyg7COmQigW7JkiWjcuLF01diTEy/sieYZdWUS8JWXl0uvBlKvWrVqgU0IPNAfGMuYoLJbt27y1pJzUFMrR80aSQjwevfuLQGOv9AGuAbG08A6QgjB90GDBqUimJUg8iuQeH/9+vUyooqwPoD4f/NHwRuGjW0uAAAAAElFTkSuQmCC",
    };
  }

  componentDidMount() {
    let login = JSON.parse(localStorage.getItem("login"));
    if (!login.jwt) {
      this.nextPath("/");
    } else {
      this.setState(
        {
          loggedIn: true,
          token: login.jwt,
          user: login.user_id,
        },
        () => {
          this.getProfile();
        }
      );
    }
  }

  getProfile = () => {
    var obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      Credentials: "include",
    };

    fetch(config.TINYURL + "getProfile/" + this.state.user, obj)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
          email: data.email,
        });
      });
    // this.setState({
    //   username: "teja",
    //   email: "dpaidimarry@ea.com",
    // });
  };

  nextPath = (path) => {
    this.props.history.push(path);
  };

  usernameHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  emailHandler = (event) => {
    this.seState({
      email: event.target.value,
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    var obj = {
      method: "POST",
      Credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        user: event.target.username.value,
        password: event.target.email.value,
      }),
    };

    fetch(config.TINYURL + this.state.user, obj)
      .then((response) => response.json())
      .then((data) => {
        this.nextPath("/tinyurl");
      })
      .catch((error => {
        console.log(error)
      }))
    //this.nextPath("/tinyurl");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>

            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleUpload}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    src={this.state.image}
                    style={{ margin: "10%", marginLeft: "30%" }}
                  />
                  {/* <ProfilePicture
                    ref={this.profilePictureRef}
                    image={this.state.image}
                    useHelper={true}
                    debug={false}
                    frameFormat="circle"
                  /> */}
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    value={this.state.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.state.email}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
              {/* {!this.state.loggedIn && (
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )} */}
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withRouter(withStyles(useStyles)(SignUp));
