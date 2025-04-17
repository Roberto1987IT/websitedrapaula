from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_add_accept_terms'),
    ]

    operations = [
        migrations.RunSQL(
            sql="ALTER TABLE users_customuser ADD COLUMN terms_accepted_at DATETIME NULL;",
            reverse_sql="ALTER TABLE users_customuser DROP COLUMN terms_accepted_at;"
        ),
    ]
