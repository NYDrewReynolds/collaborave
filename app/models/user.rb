class User < ActiveRecord::Base
  has_many :parties

  def self.from_omniauth(auth_info)
    if user = find_by(uid: auth_info.uid)
      user
    else
      create({name: auth_info.extra.raw_info.name,
              screen_name: auth_info.extra.raw_info.screen_name,
              uid: auth_info.uid,
              oauth_token: auth_info.credentials.token,
              oauth_token_secret: auth_info.credentials.secret
             })
    end
  end

  def twitter_client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key = ENV["CONSUMER_KEY"]
      config.consumer_secret = ENV["CONSUMER_SECRET"]
      config.access_token = oauth_token
      config.access_token_secret = oauth_token_secret
    end
  end
end
