class User < ActiveRecord::Base
  has_many :parties

  validates :name, uniqueness: true;

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

end
